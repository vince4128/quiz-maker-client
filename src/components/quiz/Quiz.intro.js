import React from 'react';

const QuizIntro = (props) => {

    return (
        <div className="m-quiz__intro">
            <div className="m-quiz__intro__hero">
                <img className="m-quiz__img" src={`http://localhost:3000/${props.quizImg}`}/>
            </div>
            <div className="m-quiz__intro__title">
            <h1>{props.title}</h1>
            <h4 dangerouslySetInnerHTML={{__html: props.intro}} />
            {/*<button className="animated fadeInLeft m-button m-button--primary" onClick={()=>props.next()}>Démarrer</button>*/}
            <button className="animated fadeInLeft btn btn--primary" onClick={()=>props.next()}>Démarrer</button>
            </div>            
        </div>
    );

}

export default QuizIntro;