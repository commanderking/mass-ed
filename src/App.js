import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { mcasVisualizationData } from './appReducer'
import { McasContainer } from 'mcasVisualization/McasContainer';


let store = createStore(mcasVisualizationData);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <McasContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
