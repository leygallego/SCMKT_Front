import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css';
import SearchIcon from '@mui/icons-material/Search';
// import Footer from './Footer';
import axios from 'axios';






function Home() {


//     const [error, setError] = useState(null);
//   const [sent, setSent] = useState(false);

//   const [to, setTo] = useState('');
//   const [subject, setSubject] = useState('');
//   const [text, setText] = useState('');
//   const [html, setHtml] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       await axios.post('https://scmkt.herokuapp.com/api/mail', { to, subject, text, html });

//       setSent(true);
//       setError(null);
//     } catch (err) {
//       setError(err.response.data);
//     }
//   };


    return (
        <>

{/* <form onSubmit={handleSubmit}>
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="To"
        />
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text"
        />
        <input
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="Html code"
        />
        <button type="submit">Submit</button>
      </form>
      {error && error}
      {sent && <p>Email sent!</p>} */}

            <div className="main">


                <div className="area-texto">
                    <div className="texto-home">
                        <h1>Soluciona tus necesidades de codigo más rapido que nunca</h1>

                    </div>
                    <div className="texto-secundario">
                        <p>Pon recompensas por tus problemas más dificiles y ve como la comunidad lo resuelve</p>

                    </div>
                    <div className="button-container">
                    <NavLink to="/contratos"><Button
                            className="busca-contratos"
                            variant="contained"
                            startIcon={<SearchIcon />}
                        >Buscar Contratos</Button></NavLink>
                        
                    </div>
                    <div className="contenedor-secundario">
                        <div className="wrap-downpage">
                            <div className="texto-motivador">
                                <p>Mi abuelo siempre me decía: "Hazlo lento que voy apurado". Codear primero los tests puede parecer más lento pero los beneficios son increíbles.</p> <br />
                                <p>Desde evitar romper hasta la detección de bugs que habíamos olvidado, automatizar los tests nos ayuda a construír sin miedo y de forma robusta</p>
                            </div>

                        </div>
                    </div>



                </div>

                <div className="wraper-images">
                    <div className="imagen-home">

                        <img src="/images/assetHome2.png" alt="imagen para home" />

                    </div>
                    <div className="imagen-azul">
                        <img src="/images/azul.png" alt="imagen azul" />
                    </div>
                </div>


            </div>

            <div className="divisor-home"></div>

        </>

    )
}

export default Home
