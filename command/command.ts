import CreateIssueEvent from 'cqrs-common/lib/events/CreateIssueEvent'
import Kafka from 'node-rdkafka'
import express from 'express'
import bodyParser from 'body-parser'

const EXPRESS_PORT = 8081
const EXPRESS_HOSTNAME = 'command.local'

// Create Kafka Producer
const producer = new Kafka.Producer({
  'client.id': 'node-command1',
  'metadata.broker.list': 'kafka.local:9092',
  'compression.codec': 'gzip',
  'retry.backoff.ms': 200,
  'message.send.max.retries': 10,
  'socket.keepalive.enable': true,
  'queue.buffering.max.messages': 100_000,
  'queue.buffering.max.ms': 0,
  'batch.num.messages': 1_000_000,
  'dr_cb': true,
}, {})

// Poll for events every 100 ms
producer.setPollInterval(100)

producer.connect()

// Create react app
const app = express()

app.use(bodyParser.json())

function produce(data): boolean {
  const message = Buffer.from(JSON.stringify(data))
  return producer.produce('events', null, message)
}

app.post('/', (req, res) => {
  const event = req.body
  const { type, ...params } = event

  const success = produce(event)
  res.send({ event: type, success })

  console.log(`${type} - ${JSON.stringify(params)}`)
})

// Wait for the app to be ready
producer.on('ready', () => {
  app.listen(EXPRESS_PORT, EXPRESS_HOSTNAME, () => {
    console.info(`Listening on POST http://${EXPRESS_HOSTNAME}:${EXPRESS_PORT}/`)
  })
})

// Any errors we encounter, including connection errors
producer.on('event.error', (err) => {
  console.error('Error from producer')
  console.error(err)
})

// Report of delivery statistics here
producer.on('delivery-report', function (err, report) {
  console.log('Report', report)
})
