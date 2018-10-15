import PropTypes from 'prop-types';
import React, {Component} from 'react';

class Tab extends Component {
    static PropTypes = {
        activeTab: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    };

    onClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    }

    render(){
        const {
            onClick,
            props: {
                activeTab,
                label
            }
        } = this;

        let className="m-tab-list__item";

        if(activeTab === label){
            className += ' m-tab-list__item--active';
        }

        return (
            <li
                className={className}
                onClick={onClick}
            >
                {label}
            </li>
        );
    }
}

export default Tab;