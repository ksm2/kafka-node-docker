import Event from './Event'

export default class IssueCreatedEvent extends Event {
  constructor(readonly id: string, readonly title: string) {
    super()
  }
}
