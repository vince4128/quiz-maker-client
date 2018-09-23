import React, { Component } from 'react';

const QuestionShow = (props) => {
    if(props.question){
        return(
            <div>
                <p>{props.question.statement}</p>
                <ul>
                    {props.question.proposal.map((p) => {
                        return <li>{p.text}</li>
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

export default QuestionShow;