import React from 'react';
import Pie from '../ui/pie';
import Score from '../ui/score';

const QuizEnd = (props) => {

    return(
        <div>
            <h2 className="a-question--score">Votre score est de : {Math.round(props.scorePercent)} %</h2>
            <div className="a-graph-result">
                <Score score={props.scorePercent}></Score>
            </div>                                    
            {props.scorePercent > 80 ? 
                <h4 dangerouslySetInnerHTML={{__html: props.feedback.good}}/>
                : <h4 dangerouslySetInnerHTML={{__html: props.feedback.bad}}/>
            }            
        </div>        
    )

}

export default QuizEnd;