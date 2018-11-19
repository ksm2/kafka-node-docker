import CreateIssueEvent from '../events/CreateIssueEvent'
import Event from '../events/Event'

export default function isCreateIssueEvent(data: Event): data is CreateIssueEvent {
  return data.type === 'create-issue'
}
