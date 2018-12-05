import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuizzes, deleteQuiz } from '../../actions';
import QuizCard from './Quiz.card';

class QuizIndexCat extends Component {

    constructor(props){
        super(props);
        this.state = {
            user:null,
            catId:null,
            filterUser:false,            
        }
    }

    componentDidMount(){
        this.props.fetchQuizzes();        
        const { id } = this.props.match.params;
        this.setState({
            user:this.props.connected._id,
            catId:id
        });
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

    renderQuizzes(){
        if(this.state.filterUser){
            const data = Object.assign({}, this.props.quiz)        
            return Object.keys(data)
                .map(key => {
                    const renderData = data[key];
                if(renderData.author._id === this.props.connected._id && renderData.category._id === this.state.catId){return <QuizCard quiz={renderData} userId={this.props.connected._id} deleteQuiz={(id)=>{this.handleDelete(renderData._id)}}></QuizCard>;}
                })
        }else{        
            const data = Object.assign({}, this.props.quiz)        
            return Object.keys(data)
                .map(key => {
                    const renderData = data[key];
                    if(renderData.category._id === this.state.catId){
                        return <QuizCard quiz={renderData} userId={this.props.connected._id} deleteQuiz={(id)=>{this.handleDelete(renderData._id)}}></QuizCard>;
                    }                    
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
                <h3>Catégorie : {JSON.stringify(this.state.catId)}</h3>
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

export default withRouter(connect(mapStateToProps, { fetchQuizzes, deleteQuiz })(QuizIndexCat));