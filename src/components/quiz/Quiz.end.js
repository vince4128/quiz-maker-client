import React from 'react';
import Pie from '../ui/pie';

const QuizEnd = (props) => {

    return(
        <div>
            {/*<Pie></Pie>*/}
            <h1 className="a-question--score">{props.scorePercent} %</h1>            
                {props.scorePercent > 80 ? 
                    <h4 dangerouslySetInnerHTML={{__html: props.feedback.good}}/>
                    : <h4 dangerouslySetInnerHTML={{__html: props.feedback.bad}}/>
                }            
        </div>        
    )

}

export default QuizEnd;