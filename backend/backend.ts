import bodyParser from 'body-parser'
import debug from 'debug'
import Event from '../common/events/Event'
import express, {NextFunction, Request, Response} from 'express'
import IssueCreatedEvent from "../common/events/IssueCreatedEvent"
import IssueRenamedEvent from "../common/events/IssueRenamedEvent"
import projectEventsToIssues from "./issue-projection"

const info = debug('query:info')
const error = debug('query:error')

const EXPRESS_PORT = 8082
const EXPRESS_HOSTNAME = 'query.local'

class NotFoundError extends Error {
  name = 'NotFoundError'
  status = 404
}

function logErrors(err: any, req: Request, res: Response, next: NextFunction) {
  error(err)
  next(err)
}

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500
  res.status(status)
  res.send({status, error: err.message})
}

// Create express app
const app = express()

app.use(bodyParser.json())

const eventStore: Event[] = [
  new IssueCreatedEvent('ISSUE-1', 'Create first issue'),
  new IssueRenamedEvent('ISSUE-1', 'Rename first issue'),
  new IssueCreatedEvent('ISSUE-2', 'Create another issue'),
]

/**
 * COMMAND HTTP METHODS
 */

app.post('/command', async (req, res) => {
  const command = req.body
  const {type, ...params} = command

  // 1. Find command handler
  // 2. Execute command handler
  // 2.1 Command handler creates / updates aggregate and updates write model
  // 2.2 Command handler emits event
  // 2.3 Event subscriber react


  // try {
  //     const success = await produce(event)
  //     res.send({ event: type, success })
  // } catch (error) {
  //     res.status(512)
  //     res.send({ type, error })
  // }

  info(`${res.statusCode} ${type} - ${JSON.stringify(params)}`)
})

/**
 * QUERY HTTP METHODS
 */
app.get('/issues', async (req, res, next) => {
  try {
    const issues = projectEventsToIssues(eventStore);

    res.send(issues)
  } catch (err) {
    next(err)
  }
})

app.get('/issues/:key', async (req, res, next) => {
  try {
    const {key} = req.params
    // const result = await issues.findOne({ key })
    // if (!result) {
    //     return next(new NotFoundError(`Invalid issue: ${key}`))
    // }
    // res.send(result)
  } catch (err) {
    next(err)
  }
})

app.use(logErrors)
app.use(errorHandler)

app.listen(EXPRESS_PORT, EXPRESS_HOSTNAME, () => {
  info(`Listening on GET http://${EXPRESS_HOSTNAME}:${EXPRESS_PORT}/`)
})
