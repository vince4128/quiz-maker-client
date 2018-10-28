import React from 'react';

const QuizEnd = (props) => {

    return(
        <div>
            <h1>{props.scorePercent} %</h1>
            <h1>{props.scorePercent > 80 ? props.feedback.good : props.feedback.bad}</h1>
        </div>        
    )

}

export default QuizEnd;