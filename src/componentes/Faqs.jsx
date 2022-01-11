import React from 'react';
import Qa from "../data/faqs.json";
import Faq from '../componentes/Faq';
import './styles/faqs.css';

const Faqs = () => {
    
    return (
        <div className='faqsComponent'>
            <h2>En esta sección encontraras respuestas a las preguntas más frecuentes que nos han que hemos contestado</h2>
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
