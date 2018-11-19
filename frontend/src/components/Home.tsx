import * as React from 'react'
import ksm from './ksm.jpg'

export default class Home extends React.Component {
  render() {
    return <main>
      <h1>CQRS Example</h1>
      <p>Welcome to my new page!</p>
      <img src={ksm}/>
    </main>
  }
}
