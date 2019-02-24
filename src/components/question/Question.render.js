import React from 'react';
import SERVER from '../../actions/server';

const server = SERVER;

const QuestionRender = (props) => {

    const addCorrectionClass = (q,p) => {
        if(q.answered){
            return p.value ? "m-question__toggle--true" : "m-question__toggle--false";
        }else{
            return "m-question__toggle--selected";
        }
    }

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

    return(
        <div className="m-question--container animated slideInRight">
    
            {props.q.image ? 
                <div className="m-question__image">
                    <img src={`${server}/${props.q.image}`}/>
                </div>
                :<div className="m-question__image--placeholder"></div>
            }

            <div className="m-question">                     
                <div className="a-question__enonce" dangerouslySetInnerHTML={{__html: props.q.statement}}/>
                <form onSubmit={(e)=>{e.preventDefault()}}>                                
                    {props.q.proposal.map((p) =>{
                        return (
                            <div>                                                                                        
                                <fieldset className="a-question__proposition">
                                    <label htmlFor={p._id} className="m-question__toggle">
                                        <input
                                            id={p._id}
                                            type={props.q.type === "simple" ? "radio" : "checkbox"}
                                            name="question"
                                            className={"m-question__toggle__input " + addCorrectionClass(props.q,p)}
                                            //value={p.text}
                                            checked={p.checked}
                                            onChange={(e)=>{props.toggleCheck(props.q,p, e.target.checked)}}
                                        />
                                        <span className="m-question__toggle__button" dangerouslySetInnerHTML={{__html: p.text}} />
                                    </label>
                                </fieldset>
                            </div>
                        )
                    })}                                
                    {/*<button disabled={shouldBeDisabled(props.q)} onClick={()=>props.questionValidation(props.q)}className="btn btn--primary a-question__btn-valider">Valider</button>*/}
                </form>
                <p>
                { props.q.answered ? 
                    <div>
                        { props.q.result ? 
                            <p id="feedback" className="m-question__feedback m-question__feedback--good" dangerouslySetInnerHTML={{__html: props.q.feedback.good}} />
                        :   <p id="feedback" className="m-question__feedback m-question__feedback--bad" dangerouslySetInnerHTML={{__html: props.q.feedback.bad}} />
                        }
                    </div> 
                    : ""}
                </p>
            </div>
        
            { !props.q.answered ? <button disabled={shouldBeDisabled(props.q)} onClick={()=>props.questionValidation(props.q)}className="btn btn--primary a-question__btn-valider"><span>Valider</span></button> : ""}

        </div>
    )

}

export default QuestionRender;