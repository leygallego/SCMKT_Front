import smartLoading from './imagenes/smartLogo.png';
import './styles/loader.css';

const Loader = () => {
  return (
    <div className="loader-content">
      <img
        src={smartLoading}
        alt='loader'
        width="300"
        height="250"
      />
      <span className="loading">Loading...</span>
    </div>
  )
}

export default Loader;