import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { myERC20Contract } from "../../App";

import "./Orders.scss";


export default function Orders() {
    const [myOrders, setMyOrders] = useState([]);
    const address = useSelector(state => state.walletAddress);

    const loadOrders = async() => {
        let orders = await myERC20Contract.methods.getOrdersByUser(address).call();        
        setMyOrders(orders);
    }

    useEffect(() => {
        loadOrders();
    }, [])
    
    return (
        <div className="orders__wrapper">
            <h1>🛒 My orders:</h1>

            <div className="order-cards">
                {myOrders.map((order, index) => (
                    <div className="order-card">
                        <h3>Paid <span className="purple">10FRF</span> to <span className="blue">0x2asfsdvawdvawrvafv</span></h3>
                        <h5>Total products bought: 10</h5>
                    </div>
                ))}
            </div>
        </div>
    )
}