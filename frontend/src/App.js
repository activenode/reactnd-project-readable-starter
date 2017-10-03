import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button>
          Click Here
        </Button>
      </div>
    );
  }
}

export default App;
