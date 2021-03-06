import React, { Component } from 'react';
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import QuizIndex from './quiz/Quiz.index';
import QuizIndexCat from './quiz/Quiz.index.cat';
import QuizShow from './quiz/Quiz.show';
import QuizCreate from './quiz/Quiz.create';
import QuizEdit from './quiz/Quiz.edit';
import QuizMainEdit from './quiz/Quiz.main.edit';
import QuizCreateQuestion from './quiz/Quiz.create.question';
import QuizIntegration from './quiz/Quiz.integration';
import CategoryIndex from './category/Category.index';
import CategoryShow from './category/Category.show';
import CategoryCreate from './category/Category.create';
import CategoryEdit from './category/Category.edit';
//import UserIndex from './user/user.index';
//import UserShow from './user/user.show';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Signout from './auth/Signout';
import QuestionEdit from './question/Question.edit';
import PreviewQuiz from './preview/Preview.quiz';

class App extends Component {
  render() {
    return (
      <div className="main-layout">

        {this.props.location.pathname.includes('shared') ?
          "" : <Header auth={this.props.auth}/>}

        {this.props.location.pathname.includes('shared') || this.props.location.pathname.includes('preview') ?
          "" : <Sidebar auth={this.props.auth}/>}
          
          <section className="content-container">

            <Route path="/signin" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/signout" exact component={Signout} />

            <Route path="/" exact render={()=><QuizIndex connected={this.props.auth}/>} />

            <Switch>
              <Route path="/quiz/:id/question/:qid/edit" exact render={()=><QuestionEdit connected={this.props.auth}/>} />          
              <Route path="/quiz/:id/question/new" render={()=><QuizCreateQuestion connected={this.props.auth}/>} />          
              <Route path="/quiz/:id/edit" exact render={()=><QuizMainEdit connected={this.props.auth}/>} />
              <Route path="/quiz/:id/edit/:part" exact render={()=><QuizMainEdit connected={this.props.auth} default="general"/>} />
              <Route path="/quiz/:id/edit/:part" exact render={()=><QuizMainEdit connected={this.props.auth} default="question"/>} />
              <Route path="/quiz/new" exact render={()=><QuizCreate connected={this.props.auth}/>} />
              <Route path="/quiz/:id" render={()=><QuizShow connected={this.props.auth}/>} />
            </Switch>

            <Route path="/category" exact render={()=><CategoryIndex connected={this.props.auth}/>} />

            <Switch>
              <Route path="/category/:id/edit" exact render={()=><CategoryEdit connected={this.props.auth}/>} /> 
              <Route path="/category/new" render={()=><CategoryCreate connected={this.props.auth}/>} />
              <Route path="/category/:id/quiz" render={()=><QuizIndexCat connected={this.props.auth}/>} />
              <Route path="/category/:id" render={()=><CategoryShow connected={this.props.auth}/>} />              
            </Switch>

            <Route path="/preview/:id" exact render={()=><PreviewQuiz connected={this.props.auth} shared={false}/>} />
            <Route path="/share/:id" exact render={()=><QuizIntegration connected={this.props.auth}/>} />
            <Route path="/shared/:id" exact render={()=><PreviewQuiz connected={this.props.auth} shared={true}/>} />

        </section>

      </div>
    );
  }
}

function mapStateToProps(state){
  return { auth:state.auth, _id:state.auth._id}
}

export default withRouter(connect(mapStateToProps)(App));
