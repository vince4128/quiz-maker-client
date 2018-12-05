import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuizzes, deleteQuiz } from '../../actions';
import QuizCard from './Quiz.card';
import LongText from '../ui/LongText';

class QuizIndex extends Component {

    constructor(props){
        super(props);
        this.state = {
            user:null,
            filterUser:false,            
        }
    }

    componentDidMount(){
        this.props.fetchQuizzes();
        this.setState({user:this.props.connected._id})
    }

    handleDelete(id){
        this.props.deleteQuiz(id, this.props.connected.authenticated);        
    }

    filter(filterUser){
        //alert('filter ' + id);
        if(filterUser){
            this.setState({filterUser:true});
        }else{
            this.setState({filterUser:false});
        }
    }

    renderDate(date){    
        console.log("date",date.substring(1, 3));
        const year = date.substring(0,4);
        const day = date.substring(5,7);
        const month = date.substring(8,10);

        return `${year}/${month}/${day}`;
    }

    /*renderQuizzes(){
        const data = Object.assign({}, this.props.quiz)        
        return Object.keys(data)
            .map(key => {
                const renderData = data[key];
                const image = renderData.image ? `url(http://localhost:3000/${renderData.image})` : 'url(/img/placeholder.jpg)';                
                return (
                    <li key={renderData._id}>

                        <section className="m-card">
                            <div className="meta">
                                <div className="photo" style={{ backgroundImage: image }}></div>
                                <ul class="details">
                                    <li className="author">
                                        <i>
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                                <path d="M9.5 11c-3.033 0-5.5-2.467-5.5-5.5s2.467-5.5 5.5-5.5 5.5 2.467 5.5 5.5-2.467 5.5-5.5 5.5zM9.5 1c-2.481 0-4.5 2.019-4.5 4.5s2.019 4.5 4.5 4.5c2.481 0 4.5-2.019 4.5-4.5s-2.019-4.5-4.5-4.5z"></path>
                                                <path d="M17.5 20h-16c-0.827 0-1.5-0.673-1.5-1.5 0-0.068 0.014-1.685 1.225-3.3 0.705-0.94 1.67-1.687 2.869-2.219 1.464-0.651 3.283-0.981 5.406-0.981s3.942 0.33 5.406 0.981c1.199 0.533 2.164 1.279 2.869 2.219 1.211 1.615 1.225 3.232 1.225 3.3 0 0.827-0.673 1.5-1.5 1.5zM9.5 13c-3.487 0-6.060 0.953-7.441 2.756-1.035 1.351-1.058 2.732-1.059 2.746 0 0.274 0.224 0.498 0.5 0.498h16c0.276 0 0.5-0.224 0.5-0.5-0-0.012-0.023-1.393-1.059-2.744-1.382-1.803-3.955-2.756-7.441-2.756z"></path>
                                            </svg>
                                        </i>
                                        crée par : {renderData.author.pseudo}
                                    </li>
                                    <li className="date">
                                        <i>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                            <path d="M18.5 2h-2.5v-0.5c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5v0.5h-10v-0.5c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5v0.5h-2.5c-0.827 0-1.5 0.673-1.5 1.5v14c0 0.827 0.673 1.5 1.5 1.5h17c0.827 0 1.5-0.673 1.5-1.5v-14c0-0.827-0.673-1.5-1.5-1.5zM1.5 3h2.5v1.5c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-1.5h10v1.5c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-1.5h2.5c0.276 0 0.5 0.224 0.5 0.5v2.5h-18v-2.5c0-0.276 0.224-0.5 0.5-0.5zM18.5 18h-17c-0.276 0-0.5-0.224-0.5-0.5v-10.5h18v10.5c0 0.276-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M7.5 10h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M10.5 10h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M13.5 10h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M16.5 10h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M4.5 12h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M7.5 12h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M10.5 12h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M13.5 12h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M16.5 12h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M4.5 14h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M7.5 14h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M10.5 14h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M13.5 14h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M16.5 14h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M4.5 16h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M7.5 16h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M10.5 16h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M13.5 16h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                            <path d="M16.5 16h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
                                        </svg>
                                        </i>
                                        le : {this.renderDate(renderData.date)}
                                    </li>                                
                                </ul>
                            </div>                            
                            <section className="description">
                                <h1>{renderData.title}</h1>
                                <LongText content={renderData.description} limit="150" html="true" classToApply="desc"/>
                                <p>{renderData.category.title}</p>
                                <hr/>
                                <div class="read-more">
                                        <div className="btns">
                                        {renderData.author._id === this.props.connected._id ? 
                                        <Link className="btn btn--primary" to={`/quiz/${renderData._id}/edit`}>
                                        Éditer
                                        </Link> : ""}
                                        <Link className="btn btn--primary" id="btn-preview" to={`/preview/${renderData._id}`}>
                                        Prévisualiser
                                        </Link>
                                        <Link className="btn btn--primary" to={`/share/${renderData._id}`}>
                                        Partager
                                        </Link>  
                                        {renderData.author._id === this.props.connected._id ?
                                        <a href="" id="btn-delete" className="btn btn--error" onClick={()=>{this.handleDelete(renderData._id)}}>
                                        Supprimer&nbsp;
                                        <i>
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="#fff">
                                            <path d="M15.5 2h-3.5v-0.5c0-0.827-0.673-1.5-1.5-1.5h-2c-0.827 0-1.5 0.673-1.5 1.5v0.5h-3.5c-0.827 0-1.5 0.673-1.5 1.5v1c0 0.652 0.418 1.208 1 1.414v12.586c0 0.827 0.673 1.5 1.5 1.5h10c0.827 0 1.5-0.673 1.5-1.5v-12.586c0.582-0.206 1-0.762 1-1.414v-1c0-0.827-0.673-1.5-1.5-1.5zM8 1.5c0-0.276 0.224-0.5 0.5-0.5h2c0.276 0 0.5 0.224 0.5 0.5v0.5h-3v-0.5zM14.5 19h-10c-0.276 0-0.5-0.224-0.5-0.5v-12.5h11v12.5c0 0.276-0.224 0.5-0.5 0.5zM16 4.5c0 0.276-0.224 0.5-0.5 0.5h-12c-0.276 0-0.5-0.224-0.5-0.5v-1c0-0.276 0.224-0.5 0.5-0.5h12c0.276 0 0.5 0.224 0.5 0.5v1z"></path>
                                            <path d="M12.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path>
                                            <path d="M9.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path>
                                            <path d="M6.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path>
                                            </svg>
                                        </i>
                                        </a> : ""}                                        
                                    </div>   

                                </div>
                            </section>                            
                        </section>                 
                    </li>
                )
            })
    }*/

    renderQuizzesTest(){
        if(this.state.filterUser){
            const data = Object.assign({}, this.props.quiz)        
            return Object.keys(data)
                .map(key => {
                    const renderData = data[key];
                if(renderData.author._id == this.props.connected._id){return <QuizCard quiz={renderData} userId={this.props.connected._id} deleteQuiz={(id)=>{this.handleDelete(renderData._id)}}></QuizCard>;}
                })
        }else{        
            const data = Object.assign({}, this.props.quiz)        
            return Object.keys(data)
                .map(key => {
                    const renderData = data[key];
                    return <QuizCard quiz={renderData} userId={this.props.connected._id} deleteQuiz={(id)=>{this.handleDelete(renderData._id)}}></QuizCard>;
                })
        }
    }

    render(){
        return(
            <div className="o-content">
                {this.props.connected._id ?
                <div className="btns-toggle">
                    <label className="toggle-2">
                        <input className="toggle-2__input toggle-2--true" type="radio" name="filterUser" checked={!this.state.filterUser}/>
                        <span onClick={()=>{this.filter(false)}} className="toggle-2__button">Tous les quiz</span>
                    </label>
                    <label className="toggle-2">
                        <input className="toggle-2__input toggle-2--false" type="radio" name="filterUser" checked={this.state.filterUser}/>
                        <span onClick={()=>this.filter(true)} className="toggle-2__button">Mes Quiz</span>
                    </label>
                </div> : ""}       
                <ul className="o-card-list">
                    {this.renderQuizzesTest()}
                </ul>
            </div>
        )
    }

}

function mapStateToProps(state){
    return { quiz:state.quiz};
}

export default withRouter(connect(mapStateToProps, { fetchQuizzes, deleteQuiz })(QuizIndex));