import Issue from 'cqrs-common/lib/aggregate/Issue'
import * as React from 'react'
import { Link } from 'react-router-dom'
import receiveJSON from '../fetch/receiveJSON'
import CreateIssue from './CreateIssue'

export default class Home extends React.Component {
  state = {
    issues: [] as Issue[]
  }

  async componentDidMount() {
    const issues = await receiveJSON(`/queries/issues`)
    this.setState({ issues })
  }

  render() {
    return <main>
      <h1>Ticketing System</h1>
      <p>Welcome to your issues!</p>

      <CreateIssue/>

      <h2>Issues</h2>
      <ul>
      {this.state.issues.map(issue =>
        <li key={issue._id}>
          <Link to={issue.key}>{issue.key}: {issue.title}</Link>
        </li>)}
      </ul>
    </main>
  }
}
