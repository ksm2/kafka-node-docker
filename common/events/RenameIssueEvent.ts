import Event from './Event'

export default interface RenameIssueEvent extends Event {
  type: 'rename-issue'
  id: string
  newTitle: string
}
