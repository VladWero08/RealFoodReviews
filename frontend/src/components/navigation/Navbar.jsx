import { Link } from "react-router-dom";
import MetamaskButtonConnect from "../metamask/MetamaskButtonConnect";
import "./Navbar.scss";
import logo from "../../assets/logo.png";


function Navbar() {
    const account = localStorage.getItem("account");

    return (
        <div className="navbar__wrapper">
            <div className="navbar__logo">
                <Link to="/">
                    <img id="navbar__logo-img" src={logo}/>
                </Link>
            </div>

            <div className="navbar__links">
                <div className="navbar__link">
                    <Link to="/">Home</Link>
                </div>
                <div className="navbar__link">
                    <Link to="/restaurants">Restaurants</Link>
                </div>
                <div className="navbar__link">LOREM</div>
                <div className="navbar__link">LOREM</div>
            </div>
            
            <div className="navbar__buttons">
                <button className="navbar__btn btn-sign-up">
                    <Link to="/register">Register</Link>
                </button>

                <MetamaskButtonConnect/>

            </div>
        </div>
    )
}

export default Navbar;