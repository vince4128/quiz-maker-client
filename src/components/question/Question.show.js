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
                    <div>
                        { !this.state.editing ? 
                        <div>
                            <p>
                                {this.props.question.statement}
                                {this.props.edit ? 
                                    <span>
                                        <Link to={`/quiz/${this.props.quizId}/question/${this.props.question._id}/edit`}>Edit</Link>
                                        <button onClick={()=>{this.handleDelete(this.props.quizId, this.props.question._id)}}>delete</button>
                                    </span> 
                                    : ""}
                            </p>
                            <div>                            
                                {this.props.question.image ? <img width="250" height="auto" src={`http://localhost:3000/${this.props.question.image}`}/> : ""}
                            </div>
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