import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import './main.scss'

const root = document.getElementById('root')!

function route(children: React.ReactElement<any>) {
  return <BrowserRouter>{children}</BrowserRouter>
}

if (module.hot) {
  // Development
  const { default: RedBox } = require('redbox-react')

  function renderWithDebugging(children: React.ReactElement<any>) {
    try {
      render(<AppContainer>{route(children)}</AppContainer>, root)
    } catch (err) {
      render(<RedBox error={err}/>, root)
    }
  }

  module.hot.accept('./components/App', () => {
    unmountComponentAtNode(root)
    const NewApp = require('./components/App').default
    renderWithDebugging(<NewApp/>)
  })

  renderWithDebugging(<App/>)
} else {
  // Production
  render(route(<App/>), root)
}
