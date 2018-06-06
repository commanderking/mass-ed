import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import { mcasVisualizationData } from "./appReducer";
import { fetchSchoolMcasDataSaga } from "mcasVisualization/mcasSagas";

import { BrowserRouter as Router } from "react-router-dom";
import { RouterContainer } from "./RouterContainer";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
  mcasVisualizationData,
  /* preloadedState, */ composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(fetchSchoolMcasDataSaga);

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <RouterContainer />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
