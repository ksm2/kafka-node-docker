kafka-node-docker
=================

Sample cluster with Kafka and Node.js using Docker

Setup
-----

Simply run

    docker-compose up --build
    
It will start

- Zookeeper
- Kafka
- Node.js Producer
- Node.js Consumer

The Node.js Producer sends a message every second to Kafka.

The Node.js Consumer listens for incoming messages and `console.log`s them.
