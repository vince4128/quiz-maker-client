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
                return q.title;
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
                    <li>
                        {q.intro ? <QuizIntro quizImg={props.quizImg} intro={q.intro} title={q.title} next={() => {props.prevNext("next")}}/> : ""}
                        {q.feedback && (q.index === props.totalSlide-1) ? <QuizEnd scorePercent={props.scorePercent} feedback={q.feedback}/> : ""}                        
                        {q.proposal ?
                            <QuestionRender q={q} toggleCheck={props.toggleCheck} questionValidation={props.questionValidation}/>
                            : ""
                        }
                        <section className="m-quiz__nextBtn">
                            {/*q.answered ? <button className="animated fadeIn m-button m-button-group--primary" onClick={()=>props.prevNext("next")}>Suivant</button> : ""*/}
                            {q.answered ? <button className="animated fadeIn btn btn-group--primary" onClick={()=>props.prevNext("next")}>Suivant</button> : ""}
                        </section>
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