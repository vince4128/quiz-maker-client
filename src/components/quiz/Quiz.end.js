import React from 'react';
import Pie from '../ui/pie';
import Score from '../ui/score';

const QuizEnd = (props) => {

    return(
        <div>            
            <div className="a-graph-result">
                <Score score={props.scorePercent}></Score>
            </div>
            {/*<h2 className="a-question--score">Votre score est de : {Math.round(props.scorePercent)}%</h2>*/}
            {props.scorePercent > 80 ? 
                <h4 className="m-quiz__feedback" dangerouslySetInnerHTML={{__html: props.feedback.good}}/>
                : <h4 className="m-quiz__feedback" dangerouslySetInnerHTML={{__html: props.feedback.bad}}/>
            }            
        </div>        
    )

}

export default QuizEnd;