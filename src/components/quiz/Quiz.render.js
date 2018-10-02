import React from 'react';
import ProgressBar from '../ui/progressBar';

const QuizRender = (props) => {

    const renderQuiz = () => {
        let count = 0;
        return props.quiz.map((q) => {
            q.index = count++;
            if(q.index === props.currentSlide){ 
                return(
                    <li>
                        {/*JSON.stringify(q)*/}
                        {q.intro ? <h1>{q.intro}{q.index}</h1>: ""}
                        {q.proposal ? 
                            <div>
                                {q.statement} ?
                                <br/>
                                <form>
                                {q.proposal.map((p) =>{
                                    //return <button>{p.text}</button>                                    
                                    //return <input type="radio">test</input>
                                    return (
                                        <div>
                                            <fieldset>
                                                <label>{p.text}</label>
                                                <input
                                                    type="radio"
                                                    name="question"
                                                    value={p.text}
                                                    //checked={p.checked}
                                                    //onClick={()=>{props.toggleCheck(p)}}
                                                    onChange={(e)=>{console.log(e.target.checked),props.toggleCheck(p, e.target.checked)}}
                                                />
                                            </fieldset>
                                        </div>
                                    )
                                })}
                                </form>
                                <p>
                                    <button onClick={()=>props.questionValidation(q)}>Validate</button>
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