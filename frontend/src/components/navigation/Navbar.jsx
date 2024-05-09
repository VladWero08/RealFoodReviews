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
<<<<<<< HEAD
                        <Link to={`/restaurants/my-restaurant`}>My restaurant</Link>
=======
                        <Link to={`/restaurants/${address}`}>My restaurant</Link>
>>>>>>> d147ce8 (modified the restaurant contract to extract more data when retrieving all restaurants, connected the restaurant list page to the blockchain)
                    </div>
                )}

                {accountType === "user" && (
                    <>
                        <div className="navbar__link">
                            <Link to={`/restaurants/${address}`}>My receipts</Link>
                        </div>
                        <div className="navbar__link">
                            <Link to={`/restaurants/${address}`}>My reviews</Link>
                        </div>
                    </>
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