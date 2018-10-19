import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';

class QuizIntegration extends Component{

    constructor(props){
        super(props);
    }

    linkToClipboard = (e,type) => {        
        if(type==='link'){
            this.linkref.select();
            document.execCommand('copy');
            e.target.focus();
            alert('lien copié dans le presse-papier');      
        }else{
            this.textarearef.select();
            document.execCommand('copy');
            e.target.focus();
            alert('code embed copié dans le presse papier');
        }
          
    }

    render(){
        return(
            <div className="o-content">
                <section className="m-form">
                    <h1>Code d'intégration du quiz</h1>
                    <section>
                        <fieldset>
                            <h3>Via une url</h3>                
                            <input ref={(linkref) => this.linkref = linkref} type="text" value={`http://localhost:3001/shared/${this.props.match.params.id}`} id="sharedQuiz"/>
                            <button className="m-button m-button--primary" onClick={(e)=>this.linkToClipboard(e,'link')}>Copier le lien</button>
                        </fieldset>
                    </section>
                    <section>
                        <fieldset>
                            <h3>Via un code d'intégration</h3>
                            <input 
                                type="textarea"
                                ref={(textarearef) => this.textarearef = textarearef} 
                                value={`<iframe src="http://localhost:3001/shared/${this.props.match.params.id}" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" width="100%" height="100vh"></iframe>`}                         
                                id="iframeSharedQuiz"/>
                            <button className="m-button m-button--primary" onClick={(e)=>this.linkToClipboard(e,'embed')}>Copier le code</button>
                        </fieldset>
                    </section>
                </section>
            </div>
        )
    }
    
}

export default withRouter(QuizIntegration);