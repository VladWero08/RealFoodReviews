import "./MetamaskButtonConnect.scss";

import metamask from "../../assets/metamask.svg";

export default function MetamaskButtonConnect() {
    return (
        <div className="btn-metamask">
            <img src={metamask} alt="metamask"/>
            <p>Connect</p>
        </div>
    );
}