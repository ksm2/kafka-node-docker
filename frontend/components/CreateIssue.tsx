import * as React from 'react'
import IssueCreatedEvent from '../../common/events/IssueCreatedEvent'
import guid from '../../common/helpers/guid'
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
    const event: IssueCreatedEvent = { type: 'create-issue', id, title }

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
