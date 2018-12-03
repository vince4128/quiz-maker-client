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
        const {content, limit, html, classToApply} = this.props;
        const {showAll} = this.state;

        if(content.length <= limit) {
            return <div>
            {html ? <p className={classToApply} dangerouslySetInnerHTML={{__html: content}}></p> : <p>{content}</p>}
            </div>
        }

        if(showAll) {
            return <div>
                {html ? <p className={classToApply} dangerouslySetInnerHTML={{__html: content}}></p> : <p>{content}</p>}
                <a className="a-longtext__toggle small" onClick={this.showLess}>Lire moins</a>
            </div>
        }

        const toShow = content.substring(0,limit)+"<span class='a-longtext__points'>[...]</span>";
        return <div>
            {html ? <p className={classToApply} dangerouslySetInnerHTML={{__html: toShow}}></p> : <p>{toShow}</p>}
            <a className="a-longtext__toggle small" onClick={this.showMore}>Lire plus</a>
        </div>
    }
}

export default LongText;