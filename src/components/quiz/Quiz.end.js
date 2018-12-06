import React from 'react';

const QuizEnd = (props) => {

    return(
        <div>
            <h1 className="a-question--score">{props.scorePercent} %</h1>            
                {props.scorePercent > 80 ? 
                    <h4 dangerouslySetInnerHTML={{__html: props.feedback.good}}/>
                    : <h4 dangerouslySetInnerHTML={{__html: props.feedback.bad}}/>
                }            
        </div>        
    )

}

export default QuizEnd;