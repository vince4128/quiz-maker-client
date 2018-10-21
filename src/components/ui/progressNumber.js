import React from 'react';

const progressNumber = (props) => {

    return (
        <div className="m-quiz__number">   
            { props.currentSlide > 0 && props.currentSlide+1 < props.totalSlide ? `${props.currentSlide} / ${props.totalSlide-2}` : 'Introduction'}
        </div>
    )
}

export default progressNumber;