import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Modal } from '@mui/material';

import { setWalletAddress, setAccountType } from "../../actions";
import { userContract, restaurantContract } from "../../App";

import metamask from "../../assets/metamask.svg";
import "./MetamaskButtonConnect.scss";

export default function MetamaskButtonConnect() {
    const dispatch = useDispatch();
    const address = useSelector(state => state.walletAddress);
    const [modal, setModal] = useState(false);

    /**
     * Function to get what type of account is,
     * user, restaurant or null type.
     */
    const getAccountType = async (account) => {
        const isUser = await userContract.methods.userExists(account).call();
        const isRestaurant = await restaurantContract.methods.restaurantExists(account).call();

        if (isUser === false && isRestaurant === false) {
            return null;
        } else if (isRestaurant === true) {
            return "restaurant";
        } else if (isUser === true) {
            return "user";
        } 
    }

    /**
     * Function to be called when the metamask connection
     * was successfully done. It sets the local storage and
     * redux variables of: account address & account type.
     */
    const handleMetamaskSuccessfullConnection = async (account) => {
        dispatch(setWalletAddress(account));
        localStorage.setItem("account", account);

        const accountType = await getAccountType(account);
        dispatch(setAccountType(accountType))
        localStorage.setItem("accountType", accountType);
    }

    /**
     * Connects the Metamask wallet using the browser extension.
     */
    const handleMetamaskWalletConnection = async () => {
        // check if metamask is on or not
        if (window.ethereum) {
            // connect the metamask wallet to the application
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then(async (account) =>
                    await handleMetamaskSuccessfullConnection(account[0])
                );
        } else {
            alert("In order to connect, install the MetaMask Browser extension.");
        }
    };

    /**
     * Removes the variables from localStorage and redux.
     */
    const handleMetamaskWalletDisconnection = () => {
        dispatch(setWalletAddress(null));
        localStorage.removeItem("account");

        dispatch(setAccountType(null));
        localStorage.removeItem("accountType");
    }

    if (address === null) {
        return (
            <div 
                className="btn-metamask"
                onClick={async () => await handleMetamaskWalletConnection()}
            >   
                <img src={metamask} alt="metamask"/>
                <p>Connect</p>
            </div>
        );
    } else {
        return (
            <>
            <div 
                className="btn-metamask"
                onClick={() => {setModal(true);}}
            >   
                <img src={metamask} alt="metamask"/>
                <p>Connected</p>
            </div>

            <Modal open={modal} onClose={() => {setModal(false);}}>
                <div className="metamask-modal">
                    <p>Do you want to disconnect your <br></br>Metamask waller from Real Food Reviews? 😔</p>
                    <div 
                        className="btn-yes"
                        onClick={handleMetamaskWalletDisconnection}
                    >Yes</div>
                </div>
            </Modal>
            </>
        )
    }
}