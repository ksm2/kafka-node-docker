export default async function sendJSON(path: string, data: any, method = 'POST') {
  const headers = { 'content-type': 'application/json' }
  const body = JSON.stringify(data)

  await fetch(path, { method, headers, body })
}
