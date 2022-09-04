import { Link } from 'react-router-dom';
import logo from '../assets/J-P web special_black.png';

const Header = () => {

    return(
        <div className="app-header">
            <h1>J&P CANDLES</h1>
            <img src={logo} width="140" height="35" alt="Logo" />
        </div>
    )

}

export default Header;