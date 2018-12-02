import React, {Component} from 'react';

class LongText extends Component {
    constructor(props){
        super(props);
        this.state = {
            showAll:false
        }
    }

    showMore = () => this.setState({showAll:true});
    showLess = () => this.setState({showAll:false});

    render(){
        const {content, limit, html} = this.props;
        const {showAll} = this.state;

        if(content.length <= limit) {
            return <div>
            {html ? <p dangerouslySetInnerHTML={{__html: content}}></p> : <p>{content}</p>}
            </div>
        }

        if(showAll) {
            return <div>
                {html ? <p dangerouslySetInnerHTML={{__html: content}}></p> : <p>{content}</p>}
                <a onClick={this.showLess}>Read less</a>
            </div>
        }

        const toShow = content.substring(0,limit)+"...";
        return <div>
            {html ? <p dangerouslySetInnerHTML={{__html: toShow}}></p> : <p>{toShow}</p>}
            <a onClick={this.showMore}>Read More</a>
        </div>
    }
}

export default LongText;