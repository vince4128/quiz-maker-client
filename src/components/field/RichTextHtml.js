import React, {Component} from 'react';
import RichTextEditor from 'react-rte';

class RichTextHtml extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.input.value === '' ?
                RichTextEditor.createEmptyValue() :
                RichTextEditor.createValueFromString(this.props.input.value, 'html')
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.input.value !== this.state.value.toString('html')) {
            this.setState({
                value: nextProps.input.value ?
                    RichTextEditor.createValueFromString(nextProps.input.value, 'html') :
                    RichTextEditor.createEmptyValue()
            });
        }
    }

    onChange(value) {
        const isTextChanged = this.state.value.toString('html') != value.toString('html');
        this.setState({value}, e => isTextChanged && this.props.input.onChange(value.toString('html')));
    };

    render() {
        return (
            <RichTextEditor value={this.state.value} onChange={this.onChange.bind(this)} />
        );
    }
}

export default RichTextHtml;