import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './header/Header';
import QuizIndex from './quiz/Quiz.index';
import QuizShow from './quiz/Quiz.show';
import QuizCreate from './quiz/Quiz.create';
import QuizEdit from './quiz/Quiz.edit';
import QuizCreateQuestion from './quiz/Quiz.create.question';
import CategoryIndex from './category/Category.index';
import CategoryShow from './category/Category.show';
import CategoryCreate from './category/Category.create';
import CategoryEdit from './category/Category.edit';
//import UserIndex from './user/user.index';
//import UserShow from './user/user.show';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Signout from './auth/Signout';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Header auth={this.props.auth}/>

        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signout" exact component={Signout} />

        <Route path="/" exact render={()=><QuizIndex connected={this.props.auth}/>} />

        <Switch>
          <Route path="/quiz/:id/question/new" render={()=><QuizCreateQuestion connected={this.props.auth}/>} />
          <Route path="/quiz/:id/edit" exact render={()=><QuizEdit connected={this.props.auth}/>} /> 
          <Route path="/quiz/new" exact render={()=><QuizCreate connected={this.props.auth}/>} />
          <Route path="/quiz/:id" render={()=><QuizShow connected={this.props.auth}/>} />
        </Switch>

        <Route path="/category" exact render={()=><CategoryIndex connected={this.props.auth}/>} />

        <Switch>
          <Route path="/category/:id/edit" exact render={()=><CategoryEdit connected={this.props.auth}/>} /> 
          <Route path="/category/new" render={()=><CategoryCreate connected={this.props.auth}/>} />
          <Route path="/category/:id" render={()=><CategoryShow connected={this.props.auth}/>} />
        </Switch>   

        <p className="App-intro">
          Welcome to QuizMaker.
        </p>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { auth:state.auth, _id:state.auth._id}
}

export default connect(mapStateToProps)(App);
