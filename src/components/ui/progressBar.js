import React from 'react';

const ProgressBar = (props) => {

    const progressPercent = () => {
        const fraction = 100/(props.totalSlide-1);
        const progress = props.currentSlide*fraction;
        if(progress>100){
            return 100
        }else{
            return props.currentSlide*fraction;
        }        
    }

    return (
        <div className="m-quiz__wrapper-progress-bar">
            <div className="m-quiz__progress--bar" style={{width:progressPercent()+'%'}}></div>
        </div>
    )
}

export default ProgressBar;