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
                console.log(q);
                q.answered = false;
                q.proposal.map((p) => {
                    p.checked = false;
                })
                //QuizzArray[`${q._id}`] = q;
                QuizzArray.push(q)
            })
            QuizzArray.push({feedback:Quiz.feedback});
            this.setState(
                {
                    quiz:QuizzArray,
                    totalSlide:Quiz.question.length
                }
            );
            console.log(QuizzArray);
        });
    }

    prevNext(direction){
        if(direction === "next" && this.state.currentSlide <= this.state.totalSlide){
            this.setState({currentSlide:this.state.currentSlide += 1});
        }else if(direction === "prev" && this.state.currentSlide > 0){
            this.setState({currentSlide:this.state.currentSlide -= 1});
        }
    }

    questionValidation(q){
        //set state pour updater la question dans l'objet quiz présent dans state        
        alert("validation " + q.index);
        q.answered = true;
        const data = Object.assign(this.state.quiz);
        data[`${q.index}`] = q;
        this.setState({quiz:data});        
    }

    toggleCheck(q, p, check){
        //p.checked = !p.checked;
        //TODO add a method for multi-choice question
        //if question simple
        const data = Object.assign(this.state.quiz);      
        data[`${q.index}`].proposal.map((i) => {
            i.checked = false;
        })
        if(check){
            //data[`${q.index}`].proposal[`${p._id}`].checked = true;
            data[`${q.index}`].proposal.map((i) => {
                if(i._id === p._id){
                    i.checked = true;
                    console.log("III",i);
                }
            })
            data[`${q.index}`] = q;
            this.setState({quiz:data});
        }
        this.setState({quiz:data});
    }

    render(){

        return(
            
            <div>
                <h1>Quiz Preview</h1>
                {JSON.stringify(this.state)}
                <hr/>
                <QuizRender
                    quiz={this.state.quiz} 
                    currentSlide={this.state.currentSlide}
                    totalSlide={this.state.totalSlide}
                    prevNext={(direction)=>{this.prevNext(direction)}}
                    questionValidation={(index)=>{this.questionValidation(index)}}
                    toggleCheck={(q, p, check)=>this.toggleCheck(q, p, check)}
                    />
            </div>
        )

    }

}

function mapStateToProps(state){
    return { quiz:state.quiz};
}

export default withRouter(connect(mapStateToProps, {fetchQuiz})(PreviewQuiz));