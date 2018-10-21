import React from 'react';

const ProgressBar = (props) => {

    const progressPercent = () => {
        const fraction = 100/(props.totalSlide-2);
        const progress = props.currentSlide*fraction;
        if(progress>100){
            return 100
        }else{
            return props.currentSlide*fraction;
        }        
    }

    return (
        <div className="m-quiz__progress" style={{width:progressPercent()+'%'}}>
            {/*<h1>{progressPercent()}</h1>*/}
        </div>
    )
}

export default ProgressBar;