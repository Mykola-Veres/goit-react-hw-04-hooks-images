import { Watch } from 'react-loader-spinner';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { LoaderStyle } from './Loader.styled';

const Loader = () => (
  <LoaderStyle>
    <Watch heigth="100" width="100" color="blue" ariaLabel="loading" />  
  </LoaderStyle>
  
);
export default Loader;
