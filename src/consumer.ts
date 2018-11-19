import Kafka from 'node-rdkafka'

const consumer = new Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'kafka:29092',
}, {})

consumer.connect()

consumer.on('ready', () => {
  consumer.subscribe(['test'])

  consumer.consume()
  console.log('Consuming')
})

consumer.on('data', (data) => {
  console.log(data)
  // Output the actual message contents
  console.log(data.value.toString())
})

// Any errors we encounter, including connection errors
consumer.on('event.error', (err) => {
  console.error('Error from consumer')
  console.error(err)
})
