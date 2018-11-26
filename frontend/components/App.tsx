import * as React from 'react'
import { match, NavLink, Route } from 'react-router-dom'
import Home from './Home'
import { appContainer, menu, brand, footer } from './App.scss'
import ViewIssue from './ViewIssue'

export default class App extends React.Component {
  render() {
    const year = new Date().getFullYear()

    return <div className={appContainer}>
      <nav className={menu}>
        <NavLink to='/' className={brand}>Fasselt Systems</NavLink>
      </nav>

      <Route exact path="/" component={Home}/>
      <Route path="/:issueKey" render={({ match }) => <ViewIssue issueKey={match.params.issueKey}/>}/>

      <footer className={footer}>
        Copyright © {year} Konstantin Möllers, all rights reserved.
      </footer>
    </div>
  }
}
