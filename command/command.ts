import bodyParser from 'body-parser'
import debug from 'debug'
import express from 'express'
import Kafka from 'node-rdkafka'

const info = debug('command:info')
const error = debug('command:error')

const EXPRESS_PORT = 8081
const EXPRESS_HOSTNAME = 'command.local'
const KAFKA_TIMEOUT = 60_000

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

function produce(data: any): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const message = Buffer.from(JSON.stringify(data))
    const result = producer.produce('events', null, message)

    producer.flush(KAFKA_TIMEOUT, (err?: Error) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

app.post('/', async (req, res) => {
  const event = req.body
  const { type, ...params } = event

  try {
    const success = await produce(event)
    res.send({ event: type, success })
  } catch (error) {
    res.status(512)
    res.send({ type, error })
  }

  info(`${res.statusCode} ${type} - ${JSON.stringify(params)}`)
})

// Wait for the app to be ready
producer.on('ready', () => {
  app.listen(EXPRESS_PORT, EXPRESS_HOSTNAME, () => {
    info(`Listening on POST http://${EXPRESS_HOSTNAME}:${EXPRESS_PORT}/`)
  })
})

// Any errors we encounter, including connection errors
producer.on('event.error', (err) => {
  error('Error from producer: %o', err)
})

// Report of delivery statistics here
producer.on('delivery-report', function (err, report) {
  info('Report, %o', report)
})
