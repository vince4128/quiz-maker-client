import React from 'react';

const QuizEnd = (props) => {

    return(
        <h1>{props.scorePercent > 80 ? props.feedback.good : props.feedback.bad}</h1>
    )

}

export default QuizEnd;