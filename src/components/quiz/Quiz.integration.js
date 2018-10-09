import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';

class QuizIntegration extends Component{

    constructor(props){
        super(props);
    }

    linkToClipboard = (e) => {        
        this.linkref.select();
        document.execCommand('copy');
        e.target.focus();
        alert('lien copié dans le presse-papier');        
    }

    render(){
        return(
            <div>
                <h1>Code d'intégration du quiz</h1>
                <hr/>
                <section>
                    <h3>Via une url</h3>                
                    <input ref={(linkref) => this.linkref = linkref} type="text" value={`http://localhost:3001/shared/${this.props.match.params.id}`} id="sharedQuiz"/>
                    <button onClick={this.linkToClipboard}>Copier le lien</button>
                </section>
                <section>
                    <h3>Via un code d'intégration</h3>
                    <input 
                        type="textarea" 
                        value={`http://localhost:3001/shared/${this.props.match.params.id}`}
                        value={`<iframe src="http://localhost:3001/shared/${this.props.match.params.id}" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" width="100%" height="100vh"></iframe>`} 
                        
                        id="iframeSharedQuiz"/>
                <button onClick={this.linkToClipboard}>Copier le code</button>
                </section>
            </div>
        )
    }
    
}

export default withRouter(QuizIntegration);