import * as React from 'react'
import CreateIssue from './CreateIssue'

export default class Home extends React.Component {
  render() {
    return <main>
      <h1>Ticketing System</h1>
      <p>Welcome to your issues!</p>

      <CreateIssue/>
    </main>
  }
}
