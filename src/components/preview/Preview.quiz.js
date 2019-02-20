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
            quizImg:"",
            intro:"",
            questions:{},
            score:0,
            scorePercent:0,
            progression:0,
            totalQuestion:0,
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
            QuizzArray.push({intro:Quiz.introduction, title:Quiz.title});            
            Quiz.question.map((q) => {
                console.log(q);
                q.answered = false;
                q.proposal.map((p) => {
                    p.checked = false;
                })
                //QuizzArray[`${q._id}`] = q;
                QuizzArray.push(q)
            });         
            QuizzArray.push({feedback:Quiz.feedback});
            this.setState(
                {
                    quiz:QuizzArray,
                    totalSlide:QuizzArray.length,
                    totalQuestion:Quiz.question.length,
                    quizImg:Quiz.image
                }
            );
            console.log(QuizzArray);
        });
    }

    prevNext(direction){
        window.scrollTo(0, 0);
        const currentQ = this.state.quiz[this.state.currentSlide];
        //console.log(currentQ);
        if(direction === "next" && this.state.currentSlide <= this.state.totalSlide){
            if(this.state.currentSlide > 0 && currentQ.answered){
                this.setState({currentSlide:this.state.currentSlide += 1});
            }else if(this.state.currentSlide === 0){
                this.setState({currentSlide:this.state.currentSlide += 1});
            }
        }else if(direction === "prev" && this.state.currentSlide > 0){
            this.setState({currentSlide:this.state.currentSlide -= 1});
        }
    }

    questionValidation(q){
        //set state pour updater la question dans l'objet quiz présent dans state        
        q.answered = true;
        //this.updateQinState(q);
        this.questionCorrection(q);
    }

    questionCorrection(q){
        //TODO add a method for multi-choice question
        //const currentQ = this.state.quiz[this.state.currentSlide];
        if(q.type ==="simple"){
            q.proposal.map((p) => {
                if(p.value){
                    if(p.checked){
                        q.result = true;
                        this.setState({score:this.state.score += 1});
                        this.calcScorePrecent();
                    }else{
                        q.result = false;
                    }    
                }
            });       
        }else if(q.type === "multi"){
            let isGood = true;
            q.result = true;
            q.proposal.map((p) => {
                if(p.value){
                    if(!p.checked){
                        isGood = false;
                        q.result = false;
                        return
                    }
                }
            })

            if(isGood){
                this.setState({score:this.state.score += 1});
                this.calcScorePrecent();
            }
        }
         
        this.updateQinState(q);
    }

    calcScorePrecent(){
        const scorePercent = (this.state.score * 100)/this.state.totalQuestion;
        this.setState({scorePercent});
    }

    toggleCheck(q, p, check){
        const data = Object.assign(this.state.quiz); 
        //simple question
        if(q.type === "simple"){                 
            data[`${q.index}`].proposal.map((i) => {
                i.checked = false;
            })

            if(check){
                data[`${q.index}`].proposal.map((i) => {
                    if(i._id === p._id){
                        i.checked = true;
                    }
                })
                data[`${q.index}`] = q;
                this.setState({quiz:data});
            }
        }else{
            //multiple question            
            data[`${q.index}`].proposal.map((i) => {
                if(i._id === p._id){
                    i.checked = !i.checked;
                }
            })
            data[`${q.index}`] = q;
            this.setState({quiz:data});
        }
        
        this.setState({quiz:data});
    }

    updateQinState(q){
        const data = Object.assign(this.state.quiz);
        data[`${q.index}`] = q;
        this.setState({quiz:data});
    }

    render(){

        return(
            
            <div>
                <QuizRender
                    quizImg={this.state.quizImg}
                    quiz={this.state.quiz} 
                    currentSlide={this.state.currentSlide}
                    totalSlide={this.state.totalSlide}
                    score={this.state.score}
                    scorePercent={this.state.scorePercent}
                    prevNext={(direction)=>{this.prevNext(direction)}}
                    questionValidation={(index)=>{this.questionValidation(index)}}
                    toggleCheck={(q, p, check)=>this.toggleCheck(q, p, check)}
                    shared={this.props.shared}
                    />
            </div>
        )

    }

}

function mapStateToProps(state){
    return { quiz:state.quiz};
}

export default withRouter(connect(mapStateToProps, {fetchQuiz})(PreviewQuiz));