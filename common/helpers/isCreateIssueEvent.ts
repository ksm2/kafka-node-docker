import IssueCreatedEvent from '../events/IssueCreatedEvent'
import Event from '../events/Event'

export default function isCreateIssueEvent(data: Event): data is IssueCreatedEvent {
  return data.type === 'create-issue'
}
