import Event from "../common/events/Event"
import Issue from "../common/aggregate/Issue"
import IssueCreatedEvent from "../common/events/IssueCreatedEvent"
import IssueRenamedEvent from "../common/events/IssueRenamedEvent"

export default function projectEventsToIssues(events: Event[]): Issue[] {
  const issues: Issue[] = [];

  for (const event of events) {
    if (event instanceof IssueCreatedEvent) {
      issues.push(new Issue(event.id, event.title))
    } else if (event instanceof IssueRenamedEvent) {
      const issue = issues.find(issue => issue.id == event.issueId)
      if (issue === undefined) {
        throw new Error('The world is broken!')
      }

      issue.title = event.newTitle
    }
  }

  return issues;
}
