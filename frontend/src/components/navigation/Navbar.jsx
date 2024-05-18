import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import MetamaskButtonConnect from "../metamask/MetamaskButtonConnect";
import "./Navbar.scss";
import logo from "../../assets/logo.png";
import { myERC20Contract } from "../../App";

function Navbar() {
    const [balance, setBalance] = useState();
    const address = useSelector(state => state.walletAddress);
    const accountType = useSelector(state => state.accountType);

    const getAndSetBalance = async () => {
        if (address === null) {
            return;
        }        

        const balance = await myERC20Contract.methods.balanceOf(address).call();
        setBalance(Number(balance));
    }

    getAndSetBalance();

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
                        <Link to={`/restaurants/my-restaurant`}>My restaurant</Link>
                    </div>
                )}

                {accountType === "user" && (
                    <div className="navbar__link">
                        <Link to={`/user/my-orders/`}>My orders</Link>
                    </div>
                )}

                {(accountType === "user" || accountType === "restaurant") && (
                    <div className="navbar__link-wallet">
                        <Link to={`/restaurants/${address}`}>💳 {balance} RFR</Link>
                    </div>
                )}
            </div>
            
            <div className="navbar__buttons">
                {accountType !== "user" && accountType !== "restaurant" && (
                    <button className="navbar__btn btn-sign-up">
                        <Link to="/register">Register</Link>
                    </button>
                )}

                <MetamaskButtonConnect/>

            </div>
        </div>
    )
}

export default Navbar;