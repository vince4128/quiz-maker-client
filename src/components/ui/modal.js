import React, {Component} from 'react';

class Modal extends Component {

    constructor(props){
        super(props);
        state:{
            show:false
        }
    }

    showModal = () => {
        this.setState({show:true});
    }

    hideModal = () => {
        this.setState({show:false});
    }

    render(){
        return(
            <div className={"m-modal " + this.state.show ? "m-modal--open" : ""}>
                <p>{this.props.message}</p>
            </div>
        )
    }

}