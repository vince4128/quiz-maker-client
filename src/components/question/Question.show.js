import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteQuestion } from '../../actions';
import QuestionEdit from '../question/Question.edit';

class QuestionShow extends Component {

    constructor(props){
        super(props);
        this.state = {
            editing:false,
            deleted:false
        }

        this.toggleEdit = this.toggleEdit.bind(this);
        this.parentMethod = this.parentMethod.bind(this);
    }

    handleDelete(id, qid){        
        this.props.deleteQuestion(id, qid, this.props.connected, ()=>{
            this.setState({delete : this.state.delete+=1})
        });
        this.setState({deleted:true})        
    }

    toggleEdit(){
        this.setState({editing : !this.state.editing})
    }

    parentMethod(){
        alert('parent method !');
        this.toggleEdit();
    }

    render(){
        if(this.props.question){
            if(!this.state.deleted){
                return(
                    <div className="m-question--admin">
                        <header className="m-card__header">      
                            <p dangerouslySetInnerHTML={{__html: this.props.question.statement}}></p>
                        </header>
                        {/*<ul>
                            {this.props.question.proposal.map((p) => {
                                return <li key={p._id}>
                                        {p.text} - {p.value.toString()}
                                    </li>
                            })}
                        </ul>*/}
                        { !this.state.editing ? 
                        <div>
                            <footer>                                
                                {/*this.props.edit ? 
                                    <div className="m-button-group">
                                    <button className="m-button-group--secondary" onClick={()=>{this.handleDelete(this.props.quizId, this.props.question._id)}}>delete</button>
                                        <Link to={`/quiz/${this.props.quizId}/question/${this.props.question._id}/edit`} className="m-button m-button--primary">Edit</Link>
                                    </div> 
                                : ""*/
                                this.props.edit ? 
                                    <div className="btns">
                                    <a href="" className="btn btn--error" onClick={()=>{this.handleDelete(this.props.quizId, this.props.question._id)}}>delete</a>
                                        <Link to={`/quiz/${this.props.quizId}/question/${this.props.question._id}/edit`} className="btn btn--primary">Edit</Link>
                                    </div> 
                                    : ""}
                            </footer>
                            <div>                            
                            </div>                        
                                </div> : ""}                               
                    </div>
                )
            }else{
                return("");
            }
        }else{
            return(
                <div>Aucune proposition à afficher.</div>
            )
        }  
    }

    /*constructor(props){
        super(props);
        this.state = {
            editing:false,
            delete:0
        }

        this.toggleEdit = this.toggleEdit.bind(this);
        this.parentMethod = this.parentMethod.bind(this);
    }

    handleDelete(id, qid){
        this.props.deleteQuestion(id, qid, this.props.connected, ()=>{
            //this.props.history.push(`/quiz/${this.state.selectedQuiz}/question/new`);
            this.setState({delete : this.state.delete+=1})
            this.forceUpdate();
            this.props.psuh("coucou");
        });        
    }

    toggleEdit(){
        this.setState({editing : !this.state.editing})
    }

    parentMethod(){
        alert('parent method !');
        this.toggleEdit();
    }

    render(){
        if(this.props.question){
            return(
                <div>
                    {
                        JSON.stringify(this.props)
                    }
                    { !this.state.editing ? 
                    <div>
                        <p>
                            {this.props.question.statement}
                            {this.props.edit ? 
                                <span>
                                    <Link to={`/quiz/${this.props.quizId}/question/${this.props.question._id}/edit`}>Edit</Link>
                                    <button onClick={()=>{this.props.deleteMethod(this.props.question._id)}}>delete</button>
                                </span> 
                                : ""}
                        </p>
                    <ul>
                        {this.props.question.proposal.map((p) => {
                            return <li key={p._id}>
                                    {p.text}
                                </li>
                        })}
                    </ul>
                    </div> : ""}                               

                </div>
            )
        }else{
            return(
                <div>Loading...</div>
            )
        }  
    }*/
      
}

export default connect(null, {deleteQuestion})(QuestionShow);