import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteQuestion } from '../../actions';

class QuestionShow extends Component {

    handleDelete(/*id*/){
        //this.props.deleteQuestion(id, this.props.connected.authenticated);        
    }

    render(){
        if(this.props.question){
            return(
                <div>                
                    <p>{this.props.question.statement}{this.props.edit ? <span><button>edit</button><button onClick={()=>{this.handleDelete()}}>delete</button></span> : ""}</p>
                    <ul>
                        {this.props.question.proposal.map((p) => {
                            return <li key={p._id}>
                                    {p.text}
                                </li>
                        })}
                    </ul>                
    
                </div>
            )
        }else{
            return(
                <div>Loading...</div>
            )
        }  
    }
      
}

export default connect(null, {deleteQuestion})(QuestionShow);