import React, { Component } from 'react';
import Routes from './services/routes';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      appName: "Calendar System",
      home: false
    }
  }
  render() {
    return (
      <div>
        <Header name={this.state.appName} />
        <Routes name={this.state.appName} />
        <hr />
        <Footer />
      </div>
    );
  }
}
export default App;