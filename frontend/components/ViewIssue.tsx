import * as React from 'react'
import receiveJSON from '../fetch/receiveJSON'

export default class ViewIssue extends React.Component<{ issueKey: string }> {
  state = {
    title: ''
  }

  async componentDidMount() {
    const issue = await receiveJSON(`/queries/issues/${this.props.issueKey}`)
    this.setState(issue)
  }

  render() {
    return <main>
      <h1><small>{this.props.issueKey}</small>: {this.state.title}</h1>
    </main>
  }
}
