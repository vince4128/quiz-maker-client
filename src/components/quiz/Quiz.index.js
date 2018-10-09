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

    renderQuizzes(){
        const data = Object.assign({}, this.props.quiz)
        return Object.keys(data)
            .map(key => {
                const renderData = data[key];
                return (
                    <li key={renderData._id}>
                        <section className="m-card m-card--wide">
                            <header className="m-card__header">
                                {renderData.image ? <img width="250" height="auto" src={`http://localhost:3000/${renderData.image}`}/> : ""}
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

                            <footer class="m-card__footer">
                                    <Link to={`/quiz/${renderData._id}`}>{renderData._id}</Link>

                                    <p>{renderData.date}</p>
                                    <p>{renderData.question ? renderData.question.length : ""}</p>
                                    <p>{renderData.author.pseudo}</p>

                                    {
                                    this.props.connected.authenticated ? 
                                    (
                                    <div>
                                        <button onClick={()=>{this.handleDelete(renderData._id)}}>Delete</button>&nbsp;
                                        {renderData.author._id === this.props.connected._id ? <Link to={`/quiz/${renderData._id}/edit`}>Edit</Link> : ""}
                                        &nbsp;<Link to={`/preview/${renderData._id}`}>Preview</Link>&nbsp;<Link to={`/share/${renderData._id}`}>Partager</Link>
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
                <ul>
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