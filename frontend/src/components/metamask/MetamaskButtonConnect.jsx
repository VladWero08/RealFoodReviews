import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Modal } from '@mui/material';

import metamask from "../../assets/metamask.svg";

import "./MetamaskButtonConnect.scss";
import { setWalletAddress } from "../../actions";

export default function MetamaskButtonConnect() {
    const dispatch = useDispatch();
    const address = useSelector(state => state.walletAddress);
    const [modal, setModal] = useState(false);

    const handleMetamaskSuccessfullConnection = (account) => {
        dispatch(setWalletAddress(account));
        localStorage.setItem("account", JSON.stringify(account));
    }

    const handleMetamaskWalletConnection = () => {
        // check if metamask is on or not
        if (window.ethereum) {
            // connect the metamask wallet to the application
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((account) =>
                    handleMetamaskSuccessfullConnection(account[0])
                );
        } else {
            alert("In order to connect, install the MetaMask Browser extension.");
        }
    };

    const handleMetamaskWalletDisconnection = () => {
        dispatch(setWalletAddress(null));
        localStorage.removeItem("account");
    }

    if (address === null) {
        return (
            <div 
                className="btn-metamask"
                onClick={handleMetamaskWalletConnection}
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