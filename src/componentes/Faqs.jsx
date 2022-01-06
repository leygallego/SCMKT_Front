import React from 'react';
import Qa from "../data/faqs.json";
import Faq from '../componentes/Faq';
import '../styles/faqs.css';

const Faqs = () => {

    return (
        <div className='faqsComponent'>
            {Qa ? Qa.map((qa, ind) => {
                return (
                    <Faq 
                        key={ind}
                        question={qa.question}
                        answer={qa.answer}
                    />
                ) 
            }) : <></>}
        </div>
    );
}




export default Faqs;
