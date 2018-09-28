import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuiz } from '../../actions';
import QuizRender from '../quiz/Quiz.render';

class PreviewQuiz extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedQuiz:null,
            quiz:[],
            intro:"",
            questions:{},
            score:0,
            progression:0,
            totalSlide:0,
            currentSlide:0,
            feedback:{}
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({selectedQuiz:id});
        this.props.fetchQuiz(id).then(()=>{
            const data = Object.assign({}, this.props.quiz);
            let Quiz = {};
            data[id] ? Quiz = data[id] : Quiz = { err:'Quiz inexistant' };
            let QuizzArray = [];
            QuizzArray.push({intro:Quiz.title});
            Quiz.question.map((q) => {
                QuizzArray.push(q)
            })
            QuizzArray.push({feedback:Quiz.feedback});
            this.setState(
                {
                    quiz:QuizzArray,
                    totalSlide:Quiz.question.length
                }
            );
        });
    }

    prevNext(direction){
        if(direction === "next"){
            this.setState({currentSlide:this.state.currentSlide += 1});
        }else{
            this.setState({currentSlide:this.state.currentSlide -= 1});
        }
    }

    render(){

        return(
            
            <div>
                <h1>Quiz Preview</h1>
                {JSON.stringify(this.state)}
                <hr/>
                {/*ajouter composant qui prend en parametre l'objet quiz*/}
                <QuizRender
                    quiz={this.state.quiz} 
                    currentSlide={this.state.currentSlide}
                    totalSlide={this.state.totalSlide}
                    prevNext={(direction)=>{this.prevNext(direction)}}
                    />
            </div>
        )

    }

}

function mapStateToProps(state){
    return { quiz:state.quiz};
}

export default withRouter(connect(mapStateToProps, {fetchQuiz})(PreviewQuiz));