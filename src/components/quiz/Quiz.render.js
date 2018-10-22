import React from 'react';
import ProgressBar from '../ui/progressBar';
import ProgressNumber from '../ui/progressNumber';
import QuizIntro from './Quiz.intro';
import QuizEnd from './Quiz.end';

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

    const getTitle = () => {
        const title = props.quiz.map((q) => {
            if(q.intro){
                return q.intro;
            }
        });
        return title;
    }

    const addCorrectionClass = (q,p) => {
        if(q.answered){
            return p.value ? "m-question__toggle--true" : "m-question__toggle--false";
        }else{
            return "m-question__toggle--selected";
        }
    }

    const renderQuiz = () => {
        let count = 0;
        return props.quiz.map((q) => {
            q.index = count++;
            if(q.index === props.currentSlide){
                return(
                    <li>
                        {q.intro ? <QuizIntro quizImg={props.quizImg} intro={q.intro} next={() => {props.prevNext("next")}}/> : ""}
                        {q.feedback && (q.index === props.totalSlide-1) ? <QuizEnd scorePercent={props.scorePercent} feedback={q.feedback}/> : ""}                        
                        {q.proposal ?
                            <div className="animated slideInRight">
                            {q.image ? <div className="m-question__image"><img src={`http://localhost:3000/${q.image}`}/></div>:<div className="m-question__image--placeholder"></div>} 
                            <div className="m-question">
                                {/*<ProgressBar currentSlide={props.currentSlide} totalSlide={props.totalSlide}/>
                                <ProgressNumber currentSlide={props.currentSlide} totalSlide={props.totalSlide}/>*/}                           
                                {<div className="a-question__enonce">{q.statement}</div>}
                                <br/>
                                <form onSubmit={(e)=>{e.preventDefault()}}>                                
                                {q.proposal.map((p) =>{
                                    return (
                                        <div>                                                                                        
                                            <fieldset className="a-question__proposition">
                                                <label htmlFor={p._id} className="m-question__toggle">
                                                <input
                                                    id={p._id}
                                                    type={q.type === "simple" ? "radio" : "checkbox"}
                                                    name="question"
                                                    className={"m-question__toggle__input " + addCorrectionClass(q,p)}
                                                    //value={p.text}
                                                    checked={p.checked}
                                                    onChange={(e)=>{props.toggleCheck(q,p, e.target.checked)}}
                                                />
                                                <span className="m-question__toggle__button">{p.text}</span>
                                                </label>
                                            </fieldset>
                                        </div>
                                    )
                                })}                                
                                <button disabled={shouldBeDisabled(q)} onClick={()=>props.questionValidation(q)}className="m-button m-button--primary">Valider</button>                                
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
                            </div>
                            <section className="m-quiz__nextBtn">
                                    {q.answered ? <button className="animated fadeIn m-button m-button-group--primary" onClick={()=>props.prevNext("next")}>Suivant</button> : ""}
                            </section>
                        </div>
                            : ""
                        }
                    </li>
                )
            }
        })
    }

    return(
        <div className="o-quiz">
            <ProgressBar currentSlide={props.currentSlide} totalSlide={props.totalSlide}/>
            <ProgressNumber currentSlide={props.currentSlide} totalSlide={props.totalSlide}/>
            <div className="m-quiz__title">
                <h1>{getTitle()}</h1>
            </div>
            
            <ul className="m-quiz__question">
                {renderQuiz()}
            </ul>            
        </div>
    )

}

export default QuizRender;