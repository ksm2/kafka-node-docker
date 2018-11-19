import Event from '../events/Event'
import RenameIssueEvent from '../events/RenameIssueEvent'

export default function isRenameIssueEvent(data: Event): data is RenameIssueEvent {
  return data.type === 'rename-issue'
}
