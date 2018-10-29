import React from 'react';

const QuizEnd = (props) => {

    return(
        <div>
            <h1>{props.scorePercent} %</h1>            
                {props.scorePercent > 80 ? 
                    <h1 dangerouslySetInnerHTML={{__html: props.feedback.good}}/>
                    : <h1 dangerouslySetInnerHTML={{__html: props.feedback.bad}}/>
                }            
        </div>        
    )

}

export default QuizEnd;