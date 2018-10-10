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
                        <section className="m-card m-card--wide">
                            <Link to={`/quiz/${renderData._id}`}>
                                <header className="m-card__header">                                
                                    {renderData.image ? <img className="m-card__image" width="250" height="auto" src={`http://localhost:3000/${renderData.image}`}/> : ""}
                                </header>
                                <div className="m-card__body">
                                    <h2 class="m-card__title">
                                        {renderData.title}
                                    </h2>
                                    <p className="m-card__subtitle">
                                        {renderData.description}
                                    </p>

                                    <p class="m-card__intro">
                                        {renderData.introduction}
                                    </p>                                
                                </div>
                            </Link>

                            <footer class="m-card__footer">
                                                                        
                                    <div className="m-card__footer__info">
                                        <p className="m-card__footer__info__created-by">crée par : {renderData.author.pseudo}</p>
                                        <p className="m-card__footer__info__created-at">le : {this.renderDate(renderData.date)}</p>
                                    </div>
                                    <p className="m-card__footer__info">nombre de questions : {renderData.question ? renderData.question.length : ""}</p>

                                    {
                                    this.props.connected.authenticated ? 
                                    (
                                    <div>                                        
                                        &nbsp;<Link to={`/preview/${renderData._id}`} className="m-button m-button--primary">Preview</Link>&nbsp;
                                        <Link className="m-button m-button--primary" to={`/share/${renderData._id}`}>Partager</Link>
                                        {renderData.author._id === this.props.connected._id ? 
                                        <Link className="m-button m-button--primary" to={`/quiz/${renderData._id}/edit`}>Edit</Link> : ""}
                                        <button className="m-button m-button--primary" onClick={()=>{this.handleDelete(renderData._id)}}>Delete</button>
                                    </div>
                                    ) 
                                    : ""}
                                    
                                </footer>
                                                   
                        </section>                    
                    </li>
                )
            })
    }

    render(){
        return(
            <div>
                <h2>Quiz index</h2>
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