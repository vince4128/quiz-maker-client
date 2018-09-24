import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const QuestionShow = (props) => {
    if(props.question){
        return(
            <div>                
                <p>{props.question.statement}</p>
                <ul>
                    {props.question.proposal.map((p) => {
                        return <li key={p._id}>{p.text}</li>
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