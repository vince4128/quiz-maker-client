import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Tab from './Tab';

class Tabs extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired
    }

    constructor(props){
        super(props);

        this.state = {
            activeTab: this.props.children[0].props.label
        }
    }

    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab});
    }

    componentDidMount(){
        console.log("fucking props ", this.props);
        if(this.props.part){
            this.props.children.map((c)=>{
                if(c.props.partName === this.props.part){
                    this.setState({activeTab:c.props.label});
                }
            })
        }
    }

    render(){

        const {
            onClickTabItem,
            props: {
                children
            },
            state: {
                activeTab
            }
        } = this;

        return(
            <div className="o-tabs">
                <ul className="m-tab-list">
                    {children.map((child) => {
                        const { label } = child.props;

                        return(
                            <Tab
                                activeTab={activeTab}
                                key={label}
                                label={label}
                                onClick={this.onClickTabItem}
                            />
                        );

                    })}
                </ul>
                <div className="m-tab-content">
                    {children.map((child) => {
                        if(child.props.label !== activeTab ) return undefined;
                        return child.props.children;
                    })}
                </div>
            </div>
        );
    }
}

export default Tabs;