import bodyParser from 'body-parser'
import express from 'express'
import { MongoClient } from 'mongodb'

const EXPRESS_PORT = 8082
const EXPRESS_HOSTNAME = 'query.local'

class NotFoundError extends Error {
  name = 'NotFoundError'
  status = 404
}

function logErrors(err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function errorHandler(err, req, res, next) {
  const status = err.status || 500
  res.status(status)
  res.send({ status, error: err.message })
}

// Create express app
const app = express()

app.use(bodyParser.json())

async function query() {
  const mongo = await MongoClient.connect('mongodb://mongo.local:27017/issue_system', { useNewUrlParser: true })
  const db = mongo.db('issue_system')
  const issues = db.collection('issues')

  app.get('/issues', async (req, res, next) => {
    try {
      const result = await issues.find().toArray()
      res.send(result)
    } catch (err) {
      next(err)
    }
  })

  app.get('/issues/:key', async (req, res, next) => {
    try {
      const { key } = req.params
      const result = await issues.findOne({ key })
      if (!result) {
        return next(new NotFoundError(`Invalid issue: ${key}`))
      }
      res.send(result)
    } catch (err) {
      next(err)
    }
  })

  app.use(logErrors)
  app.use(errorHandler)

  app.listen(EXPRESS_PORT, EXPRESS_HOSTNAME, () => {
    console.info(`Listening on GET http://${EXPRESS_HOSTNAME}:${EXPRESS_PORT}/`)
  })
}

query().catch(console.error)
