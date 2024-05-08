import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import MetamaskButtonConnect from "../metamask/MetamaskButtonConnect";
import "./Navbar.scss";
import logo from "../../assets/logo.png";


function Navbar() {
    const address = useSelector(state => state.walletAddress);
    const accountType = useSelector(state => state.accountType);

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

                {accountType === "restaurant" && (
                    <div className="navbar__link">
                        <Link to="/restaurants/0">My restaurant</Link>
                    </div>
                )}

                {accountType === "user" && (
                    <div className="navbar__link">
                        <Link to="/restaurants/0">My receipts</Link>
                    </div>
                )}

                {(accountType === "restaurant" || accountType == "user") && (
                    <div className="navbar__link">
                        <Link to="/restaurants/0">My reviews</Link>
                    </div>
                )}
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