import isCreateIssueEvent from 'cqrs-common/lib/helpers/isCreateIssueEvent'
import isEvent from 'cqrs-common/lib/helpers/isEvent'
import Kafka from 'node-rdkafka'
import MongoClient from 'mongodb'

const consumer = new Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'kafka.local:9092',
}, {})

async function consume() {
  const mongo = await MongoClient.connect('mongodb://mongo.local:27017')
  const db = mongo.db('issue_system')
  const issueCollection = db.collection('issues')

  console.log(await issueCollection.find().toArray());

  consumer.connect()
  consumer.on('ready', () => {
    consumer.subscribe(['events'])

    consumer.consume()
    console.log('Consuming')
  })

  consumer.on('data', async (data) => {
    const event = JSON.parse(data.value.toString())
    console.log('Incoming event', event)
    if (!isEvent(event)) {
      console.log('No event')
      return
    }

    if (isCreateIssueEvent(event)) {
      console.log('issue stored');
      await issueCollection.insertOne({
        _id: event.id,
        title: event.title
      })

      consumer.commit()
    }
  })

  // Any errors we encounter, including connection errors
  consumer.on('event.error', (err) => {
    console.error('Error from consumer')
    console.error(err)
  })
}

consume()
