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
                                {q.proposal.map((p) =>{
                                    return <button>{p.text}</button>
                                })}
                                {q.index}
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