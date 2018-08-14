import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
      return (
          <div className="App">
              <h1>Hi I am a React app</h1>
          </div>
      );
      // compiled version:
      // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi I am a React app (JSX)!'));
  }
}

export default App;
