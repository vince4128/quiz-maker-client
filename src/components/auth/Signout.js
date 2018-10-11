import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutAction } from '../../actions';
import requireAuth from '../requireAuth';

class Signout extends Component {

    componentDidMount(){
        this.props.signoutAction();
    }

    render(){
        return(           
            <div className="o-content">
                <h2>Signed out</h2>
                <p>Sorry to see you go</p>
            </div>
        );
    }
}

export default requireAuth(connect(null, { signoutAction })(Signout));