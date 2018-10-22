import React from 'react';

const QuizIntro = (props) => {

    return (
        <div className="m-quiz__intro">
            <div className="m-quiz__intro__hero">
                <img className="m-quiz__img" src={`http://localhost:3000/${props.quizImg}`}/>
            </div>
            <div className="m-quiz__intro__title">
            <h1>{props.intro}</h1>
            <button className="animated fadeInLeft m-button m-button--primary" onClick={()=>props.next()}>Démarrer</button>
            </div>            
        </div>
    );

}

export default QuizIntro;