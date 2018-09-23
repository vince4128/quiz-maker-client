import React, { Component } from 'react';
import QuestionShow from './Question.show';

const QuestionIndex = (props) => {

    const renderQ = () => {
        if(props.questions){
            return props.questions.map((q) => {
                return (
                    <div>
                        <QuestionShow question={q}/>
                    </div>
                )
            })
        }else{
            return <p>Loading...</p>
        }
    }

    return(
        <div>
            <h4>Question index</h4>
            {renderQ()}            
            <hr/>
        </div>        
    )

}

export default QuestionIndex;