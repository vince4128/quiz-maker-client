import React, { Component } from 'react';
import QuestionShow from './Question.show';
import { Link } from 'react-router-dom';

const QuestionIndex = (props) => {

    const renderQ = () => {
        if(props.questions){
            return props.questions.map((q) => {
                return (
                    <div key={q._id}>
                        <QuestionShow 
                        question={q} 
                        quizId={props.quizId} 
                        edit={props.edit} 
                        connected={props.connected}
                        deleteMethod={(qid)=>props.deleteMethod(qid)}
                        parentMethod={()=>props.parentMethod()}/>
                    </div>
                )
            })
        }else{
            return <p>Aucune Question à afficher.</p>
        }
    }

    return(
        <div>
            <h4>Question index</h4>
            {renderQ()}
            {/*<Link to={`/quiz/${props.quizId}/question/new`}>Add Questions</Link>*/}
        </div>        
    )

}

export default QuestionIndex;