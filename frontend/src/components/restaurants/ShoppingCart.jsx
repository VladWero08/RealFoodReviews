import { useState } from "react";
import { useSelector } from 'react-redux';

import { Modal } from '@mui/material';
import "./ShoppingCart.scss";
import shoppingCart from "../../assets/shopping-cart.svg";

import { myERC20Contract } from "../../App";

export default function ShoppingCart({restaurantAddress, products, setProducts}) {
    const address = useSelector(state => state.walletAddress);
    const [modal, setModal] = useState(false);
    const totalCartPrice = products.reduce((sum, product) => sum + product.price, 0);

    const handleDeleteItemFromCart = (index) => {
        products.splice(index, 1);

        if (products.length == 0) {
            setModal(false);
        }

        setProducts([...products]);
    }

    const handleOrder = async () => {
        if (products.length == 0) {
            alert("Shopping cart is empty! Please add items before ordering.");
            return;
        }

        const productsIDs = products.map(product => product.productID);
        
        await myERC20Contract.methods.placeOrder(restaurantAddress, productsIDs).send({from: address})
            .on("receipt", (receipt) => {
                if (receipt.status) {
                    alert(`Order has made succesfully. You have paid ${totalCartPrice} RFR for this order.`);
                } else {
                    alert("Order was not placed successfully. Try again...");
                }
            });

        setProducts([]);
        setModal(false);
    }

    return (
        <div>
            <div 
                className="cart__wrapper"
                onClick={() => {if (products.length > 0) setModal(true)}}
            >
                <img src={shoppingCart} alt="cart"/>
                ({products.length})
            </div>

            <Modal 
                open={modal} 
                onClose={() => {setModal(false);}}
            >
                <div className="cart-modal">
                    {products.map((product, index) => (
                        
                        <div key={index} className="cart-product">
                            <div className="cart-product__details">    
                                <h3 className="cart-product__name">{product.name}</h3>
                                <h4 
                                    className="btn-delete-item"
                                    onClick={() => handleDeleteItemFromCart(index)}
                                >
                                    x
                                </h4>
                            </div>

                            <div className="cart-product__details">
                                <div className="cart-product__price">{product.price} ETH</div>
                                <div>{product.gramaj}g</div>    
                            </div>
                            
                            <p>{product.description}</p>                
                        </div>

                    ))}

                    <div className="line">.</div>

                    <div className="cart-total">
                        <div className="cart-product__price">Total: {totalCartPrice} ETH</div>
                        <div 
                            className="btn-order"
                            onClick={handleOrder}
                        >
                            ORDER
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}