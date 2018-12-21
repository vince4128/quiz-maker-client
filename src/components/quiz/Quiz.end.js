import React from 'react';
import Pie from '../ui/pie';

const QuizEnd = (props) => {

    return(
        <div>
            <h1 className="a-question--score">Votre score est de : {props.scorePercent} %</h1>
            <div className="a-graph-result">
                <Pie score={props.scorePercent}></Pie>
            </div>                                    
            {props.scorePercent > 80 ? 
                <h4 dangerouslySetInnerHTML={{__html: props.feedback.good}}/>
                : <h4 dangerouslySetInnerHTML={{__html: props.feedback.bad}}/>
            }
        </div>        
    )

}

export default QuizEnd;