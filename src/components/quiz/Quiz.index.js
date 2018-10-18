import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuizzes, deleteQuiz } from '../../actions';

class QuizIndex extends Component {

    componentDidMount(){
        this.props.fetchQuizzes();
    }

    handleDelete(id){
        this.props.deleteQuiz(id, this.props.connected.authenticated);        
    }

    renderDate(date){    
        console.log("date",date.substring(1, 3));
        const year = date.substring(0,4);
        const day = date.substring(5,7);
        const month = date.substring(8,10);

        return `${year}/${month}/${day}`;
    }

    renderQuizzes(){
        const data = Object.assign({}, this.props.quiz)
        return Object.keys(data)
            .map(key => {
                const renderData = data[key];
                return (
                    <li key={renderData._id}>

                        <section className="m-card">
                            <div className="meta">
                                <div className="photo" style={{ backgroundImage: `url(http://localhost:3000/${renderData.image})` }}></div>
                                <ul class="details">
                                    <li className="author">crée par : {renderData.author.pseudo}</li>
                                    <li className="date">le : {this.renderDate(renderData.date)}</li>                                
                                </ul>
                            </div>                            
                            <section className="description">
                                <h1>{renderData.title}</h1>
                                <h2>{renderData.description}</h2>
                                <p>Intro ?</p>
                                <hr/>
                                <div class="read-more">
                                    <div className="m-button-group">
                                        <button id="btn-delete" className="m-button-group--secondary" onClick={()=>{this.handleDelete(renderData._id)}}>Delete</button>                                        
                                        <Link className="" to={`/share/${renderData._id}`}>Partager</Link>
                                        {renderData.author._id === this.props.connected._id ? 
                                        <Link className="" to={`/quiz/${renderData._id}/edit`}>Edit</Link> : ""}
                                        <Link id="btn-preview" to={`/preview/${renderData._id}`} className="">Preview</Link>&nbsp;                                                                               
                                    </div>                                                                
                                </div>
                            </section>                            
                        </section>                 
                    </li>
                )
            })
    }

    render(){
        return(
            <div className="o-content">                
                <ul className="o-card-list">
                    {this.renderQuizzes()}
                </ul>
            </div>
        )
    }

}

function mapStateToProps(state){
    return { quiz:state.quiz};
}

export default withRouter(connect(mapStateToProps, { fetchQuizzes, deleteQuiz })(QuizIndex));