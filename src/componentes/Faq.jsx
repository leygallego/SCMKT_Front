import React, { useState } from 'react';

const Faq = (props) => {

    const [bool, setBool] = useState(false);

    const handleOnClick = () => {
        setBool(!bool)
    }

    return (
        <div className='faqComponent'>
            <div className='faqQuestionCompoent'>
                <a className='justifiedQuestion' href='#' onClick={handleOnClick}>{props.question}</a>
            </div>
            { bool ? <div className='faqAnswerComponent'>
                <p className='justifiedText'>{props.answer}</p>
            </div> : <></>}
        </div>
    );
}

export default Faq;
