import React from 'react';

const ProgressBar = (props) => {
    return (
        <div>
            {props.currentSlide+1} / {props.totalSlide}
        </div>
    )
}

export default ProgressBar;