import React from 'react';

const progressNumber = (props) => {

    return (
        <React.Fragment>
            <span className="m-quiz__progress">{ props.currentSlide > 0 && props.currentSlide+1 < props.totalSlide ? `${props.currentSlide} / ${props.totalSlide-2}` : ''}</span>
        </React.Fragment>
    )
}

export default progressNumber;