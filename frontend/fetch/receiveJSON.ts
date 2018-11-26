export default async function receiveJSON(path: string, method = 'GET') {
  const headers = { 'accept': 'application/json' }

  const res = await fetch(path, { method, headers })
  return res.json()
}
