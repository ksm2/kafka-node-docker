import CreateIssueEvent from 'cqrs-common/lib/events/CreateIssueEvent'
import guid from 'cqrs-common/lib/helpers/guid'
import * as React from 'react'
import sendJSON from '../fetch/sendJSON'

export default class CreateIssue extends React.Component {
  state = {
    newTitle: ''
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ newTitle: event.target.value })
  }

  async handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const id = guid()
    const title = this.state.newTitle
    const event: CreateIssueEvent = { type: 'create-issue', id, title }

    await sendJSON('/commands/', event)
    this.setState({ newTitle: '' })
  }

  render() {
    return <form onSubmit={this.handleSubmit.bind(this)}>
      <h2>Create an Issue</h2>
      <input onChange={this.handleChange.bind(this)} value={this.state.newTitle}/>
      <button>Create Issue</button>
    </form>
  }
}
