import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import QuizIndex from './quiz/Quiz.index';
import QuizShow from './quiz/Quiz.show';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Quiz Maker</h1>
        </header>
        <Route path="/" exact component={QuizIndex} />
        <Route path="/:id" exact component={QuizShow} />
        <p className="App-intro">
          Welcome to QuizMaker.
        </p>
      </div>
    );
  }
}

export default App;
