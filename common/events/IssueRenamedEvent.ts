import Event from './Event'

export default class IssueRenamedEvent extends Event {
    constructor(readonly issueId: string, readonly newTitle: string) {
        super()
    }
}
