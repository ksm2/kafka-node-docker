import Event from '../events/Event'

export default function isEvent(data: any): data is Event {
  return typeof data === 'object' && data !== null && typeof data.type === 'string'
}
