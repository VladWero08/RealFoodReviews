import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { myERC20Contract } from "../../App";

import "./Orders.scss";


export default function Orders() {
    const [myOrders, setMyOrders] = useState([]);
    const address = useSelector(state => state.walletAddress);

    const loadOrders = async() => {
        let orders = await myERC20Contract.methods.getOrdersByUser(address).call();        
        console.log(orders);
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
                    <div 
                        key={index}
                        className="order-card"
                    >
                        <h3>Paid <span className="purple">{Number(order.amount)} FRF</span> to <span className="blue">{order.to}</span></h3>
                        <h5>Total products bought: {order.products.length}</h5>
                    </div>
                ))}
            </div>
        </div>
    )
}