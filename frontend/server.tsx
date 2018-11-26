import * as React from 'react'
import * as fs from 'fs'
import * as http2 from 'http2'
import { renderToString } from 'react-dom/server'
import { StaticRouter, StaticRouterContext } from 'react-router'
import App from './components/App'

const server = http2.createSecureServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
})
server.on('error', (err) => console.error(err))

const template = fs.readFileSync('dist/index.html', 'utf8')
const html = (main: string) => template.replace('</main>', `${main}$&`)

server.on('stream', (stream, headers) => {
  const context: StaticRouterContext = { }
  const location = headers[':path']!

  if (location.endsWith('.js')) {
    stream.respondWithFile('dist/main.fb091f.js', {
      'content-type': 'application/javascript',
      ':status': 200,
    })
    return
  }

  stream.respond({
    'content-type': 'text/html',
    ':status': 200,
  })
  const main = renderToString(<StaticRouter location={location} context={context}><App/></StaticRouter>)

  stream.end(html(main))
})

server.listen(8443, () => {
  console.log('Now listening')
})
