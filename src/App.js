import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { mcasVisualizationData } from './appReducer'
import { McasContainer } from 'mcasVisualization/McasContainer';
import { fetchSchoolMcasDataSaga } from 'mcasVisualization/mcasSagas';
const sagaMiddleware = createSagaMiddleware()

let store = createStore(
  mcasVisualizationData,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(fetchSchoolMcasDataSaga);

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
