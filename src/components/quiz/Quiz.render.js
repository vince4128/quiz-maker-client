import React from 'react';
import ProgressBar from '../ui/progressBar';

const QuizRender = (props) => {

    const renderQuiz = () => {
        let count = 0;
        console.log("LE QUIZ", props.quiz);
        return props.quiz.map((q) => {
            q.index = count++;
            if(q.index === props.currentSlide){ 
                return(
                    <li>
                        {q.intro ? <h1>{q.intro}{q.index}</h1>: ""}
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
                                                    type="radio"
                                                    name="question"
                                                    value={p.text}
                                                    checked={p.checked}
                                                    onChange={(e)=>{console.log(e.target.checked),props.toggleCheck(q,p, e.target.checked)}}
                                                />
                                            </fieldset>
                                        </div>
                                    )
                                })}                                
                                <button onClick={()=>props.questionValidation(q)}>Validate</button>                                
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