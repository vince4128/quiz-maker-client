//https://github.com/fraserxu/react-chartist

import React, { Component, Fragment } from 'react';
import ChartistGraph from 'react-chartist';

class Pie extends Component {

    constructor(props){
        super(props);        
    }

    render() {

        const badAnswer = 100 - this.props.score;

        const data = {
            series: [this.props.score,badAnswer],
            labels: [1, 2, 3, 4, 5, 6, 7]
        };

        const options = {
            donut: true,
            donutWidth: 20,
            /*startAngle: 270,*/
            total: 100
        };
        
        const type = 'Pie';

        return (
            <Fragment>
                <ChartistGraph className={'ct-octave'} data={data} options={options} type={type} listener={{"draw" : function(data){ /*data.element.animate({dur:500})*/ }}}/>
                <div>{JSON.stringify(this.props.score)}</div>
            </Fragment>
        )

    }
}

export default Pie;