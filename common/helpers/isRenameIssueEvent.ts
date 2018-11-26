import Event from '../events/Event'
import IssueRenamedEvent from '../events/IssueRenamedEvent'

export default function isRenameIssueEvent(data: Event): data is IssueRenamedEvent {
  return data.type === 'rename-issue'
}
