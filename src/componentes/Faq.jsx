import React, { useState } from 'react';

const Faq = (props) => {

    const [bool, setBool] = useState(false);

    const handleOnClick = () => {
        setBool(!bool)
    }

    return (
        <div className='faqComponent'>
            <div className='faqQuestionComponent'>
                <div className='justifiedQuestion' onClick={handleOnClick}>{props.question}</div>
            </div>
            { bool ? <div className='faqAnswerComponent'>
                <p className='justifiedText'>{props.answer}</p>
            </div> : <></>}
        </div>
    );
}

export default Faq;
