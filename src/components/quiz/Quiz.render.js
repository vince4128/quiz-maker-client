import React from 'react';
import ProgressBar from '../ui/progressBar';
import ProgressNumber from '../ui/progressNumber';
import QuizIntro from './Quiz.intro';
import QuizEnd from './Quiz.end';
import QuestionRender from '../question/Question.render';

const QuizRender = (props) => {

    const getTitle = () => {
        const title = props.quiz.map((q) => {
            if(q.title){
                return (
                    <React.Fragment>
                        {props.currentSlide == (props.totalSlide - 1) ? "" : q.title}
                        <ProgressNumber currentSlide={props.currentSlide} totalSlide={props.totalSlide}/>
                    </React.Fragment>
                )                
            }
        });
        return title;
    }

    const renderQuiz = () => {
        let count = 0;
        return props.quiz.map((q) => {
            q.index = count++;
            if(q.index === props.currentSlide){
                return(
                    <li className="m-question--container">
                        {q.intro ? <QuizIntro quizImg={props.quizImg} intro={q.intro} title={q.title} next={() => {props.prevNext("next")}}/> : ""}
                        {q.feedback && (q.index === props.totalSlide-1) ? <QuizEnd scorePercent={props.scorePercent} feedback={q.feedback}/> : ""}                        
                        {q.proposal ?
                            <QuestionRender q={q} toggleCheck={props.toggleCheck} questionValidation={props.questionValidation}/>
                            : ""
                        }
                        <section className="m-quiz__nextBtn">
                            {q.answered ? <button id="btn-suivant" className="animated fadeIn btn btn--primary a-question__btn-suivant" onClick={()=>props.prevNext("next")}><span>Suivant</span></button> : ""}                            
                        </section>
                    </li>
                )
            }
        })
    }

    return(        
        <div className={"o-quiz" + (props.shared ? " o-quiz--shared" : "")}>
            <ProgressBar currentSlide={props.currentSlide} totalSlide={props.totalSlide}/>            
            {props.currentSlide == 0 ? "" : <div className="m-quiz__title">
                <h3>{getTitle()}</h3>
            </div>}
            
            <ul className="m-quiz__question m-question--container">
                {renderQuiz()}
            </ul>            
        </div>
    )

}

export default QuizRender;