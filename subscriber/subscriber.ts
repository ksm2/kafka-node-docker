import Kafka from 'node-rdkafka'
import MongoClient from 'mongodb'
import Issue from '../common/aggregate/Issue'
import isCreateIssueEvent from '../common/helpers/isCreateIssueEvent'
import isEvent from '../common/helpers/isEvent'

const ISSUE_KEY_ID = 0

const consumer = new Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'kafka.local:9092',
}, {})

async function consume() {
  const mongo = await MongoClient.connect('mongodb://mongo.local:27017/issue_system', { useNewUrlParser: true })
  const db = mongo.db('issue_system')
  const issueCollection = db.collection('issues')
  const counters = db.collection('counters')

  await issueCollection.deleteMany({})
  await counters.deleteMany({})

  await counters.insertOne({ _id: ISSUE_KEY_ID, value: 1 })

  // Connect consumer to Kafka
  consumer.connect()

  consumer.on('ready', () => {
    consumer.subscribe(['events'])

    consumer.consume()
    console.log('Consuming events from Kafka')
  })

  consumer.on('data', async (data) => {
    const event = JSON.parse(data.value.toString())
    if (!isEvent(event)) {
      console.log('No event')
      return
    }

    const { type, ...params } = event
    console.info(`IN ${type} - ${JSON.stringify(params)}`)
    if (isCreateIssueEvent(event)) {
      // Get next issue ID
      const { value: { value: key } } = await counters.findOneAndUpdate({ _id: ISSUE_KEY_ID }, { $inc: { value: 1 } })

      const issue: Issue = {
        _id: event.id,
        key: `ISSUE-${key}`,
        title: event.title
      }
      await issueCollection.insertOne(issue)

      consumer.commitMessage(data)
      console.info(`OK ${type}`);
    }
  })

  // Any errors we encounter, including connection errors
  consumer.on('event.error', (err) => {
    console.error('Error from consumer')
    console.error(err)
  })
}

consume()
