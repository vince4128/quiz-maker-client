import React from 'react';
import ProgressBar from '../ui/progressBar';

const QuizRender = (props) => {

    const shouldBeDisabled = (q) => {
        if(q.answered){
            return true;
        }
        let disabled = true;
        q.proposal.map((p) => {
            if(p.checked === true){
                disabled = false;
            }
        })
        return disabled;
    }

    const renderQuiz = () => {
        let count = 0;
        return props.quiz.map((q) => {
            q.index = count++;
            if(q.index === props.currentSlide){
                return(
                    <li>
                        {q.intro ? <h1>{q.intro}</h1>: ""}
                        {q.feedback && (q.index === props.totalSlide-1) ? <h1>{props.scorePercent > 80 ? q.feedback.good : q.feedback.bad}</h1>: ""}
                        <p>
                            Score : {props.scorePercent}<br/>
                        </p>
                        {q.proposal ? 
                            <div>
                                {q.statement} ?
                                <br/>
                                <form onSubmit={(e)=>{e.preventDefault();alert(e.values)}}>
                                {q.proposal.map((p) =>{
                                    return (
                                        <div>
                                            <fieldset>
                                                <label htmlFor={p._id}>{p.text}</label>
                                                <input
                                                    id={p._id}
                                                    type={q.type === "simple" ? "radio" : "checkbox"}
                                                    name="question"
                                                    //value={p.text}
                                                    checked={p.checked}
                                                    onChange={(e)=>{props.toggleCheck(q,p, e.target.checked)}}
                                                />
                                            </fieldset>
                                        </div>
                                    )
                                })}                                
                                <button disabled={shouldBeDisabled(q)} onClick={()=>props.questionValidation(q)}>Validate</button>                                
                                </form>
                                <p>
                                    { q.answered ? 
                                        <div>
                                            { q.result ? 
                                                <p>
                                                    {q.feedback.good}
                                                </p> 
                                            :   <p>
                                                    {q.feedback.bad}
                                                </p>
                                            }
                                        </div> 
                                    : ""}
                                </p>                                
                                <p>
                                index : {q.index}
                                </p>
                                <p>
                                answered : {JSON.stringify(q.answered)}
                                </p>                                
                            </div>
                            : ""
                        }
                    </li>
                )
            }
        })
    }

    return(
        <div>
            <ProgressBar currentSlide={props.currentSlide} totalSlide={props.totalSlide}/>
            <ul>
                {renderQuiz()}
            </ul>
            {props.currentSlide}
            <ul>
                <li onClick={()=>props.prevNext("next")}>next</li>
                <li onClick={()=>props.prevNext("prev")}>prev</li>
            </ul>
        </div>
    )

}

export default QuizRender;