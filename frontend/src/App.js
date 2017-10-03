import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Icon } from 'semantic-ui-react'
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          Hello World
          <Icon name='home' />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
