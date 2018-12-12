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
                <h2>Déconnecter</h2>
                <p>À bientôt !</p>
            </div>
        );
    }
}

export default requireAuth(connect(null, { signoutAction })(Signout));