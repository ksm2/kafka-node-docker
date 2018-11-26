import * as React from 'react'
import { NavLink, Route } from 'react-router-dom'
import Home from './Home'
import ViewIssue from './ViewIssue'
import './App.scss'

export default class App extends React.Component {
  render() {
    const year = new Date().getFullYear()

    return <div className='app-container'>
      <nav className='menu'>
        <NavLink to='/' className='brand'>Ticket System</NavLink>
      </nav>

      <Route exact path="/" component={Home}/>
      <Route path="/:issueKey" render={({ match }) => <ViewIssue issueKey={match.params.issueKey}/>}/>

      <footer className='footer'>
        Copyright © {year} Markus Fasselt & Konstantin Möllers, all rights reserved.
      </footer>
    </div>
  }
}
