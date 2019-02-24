import React from 'react';
import SERVER from '../../actions/server';

const server = SERVER;

const QuizIntro = (props) => {

    return (
        <div className="m-quiz__intro">
            <div className="m-quiz__intro__hero">
                <img className="m-quiz__img" src={`${server}/${props.quizImg}`}/>
            </div>
            <div className="m-quiz__intro__title">
            <h2>{props.title}</h2>
            <h4 className="m-quiz__intro__text" dangerouslySetInnerHTML={{__html: props.intro}} />
            {/*<button className="animated fadeInLeft m-button m-button--primary" onClick={()=>props.next()}>Démarrer</button>*/}
            <button className="animated fadeInLeft btn btn--primary btn--demarrer" onClick={()=>props.next()}>Démarrer</button>
            </div>            
        </div>
    );

}

export default QuizIntro;