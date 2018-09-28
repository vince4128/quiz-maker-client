import React from 'react';

const ProgressBar = (props) => {
    return (
        <div>
            {props.currentSlide} / {props.totalSlide}
        </div>
    )
}

export default ProgressBar;