import Event from './Event'

export default interface CreateIssueEvent extends Event {
  type: 'create-issue'
  id: string
  title: string
}
