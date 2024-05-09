import { useState } from "react";

import { TextField } from "@mui/material";
import "./ProductForm.scss";

import { restaurantContract } from "../../App";

export default function ProductForm({address}) {
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState(null);
    const [gramaj, setGramaj] = useState(null);

    const handleCreateClick = async () => {
        if (name === null || name.length === 0) {
            alert("Name field is mandatory!");
            return;
        }

        if (price === null || price < 0 || isNaN(parseInt(price))) {
            alert("Price field is mandatory!");
            return;
        }

        if (gramaj === null || parseInt(gramaj) < 0) {
            alert("Grams field is mandatory!");
            return;
        }

        if (description === null || description.length === 0) {
            alert("Description field is mandatory!");
            return;
        }

        await restaurantContract.methods.addProduct(address, name, parseInt(price), description, gramaj.toString()).send({from: address});
        window.location.reload();
    }

    return (
        <div className="product-form__wrapper">
            <h3>Add a new product:</h3>

            <div className="product-form">
                <TextField 
                    label="Name*" 
                    variant="outlined"
                    onChange={(event) => {setName(event.target.value);}}
                /> 
                <div className="product-form__box">
                    <TextField 
                        className="product-form__box-input" 
                        inputProps={{ type: 'number'}}
                        label="Price* (ETH)" 
                        variant="outlined"
                        onChange={(event) => {setPrice(event.target.value);}}
                    /> 
                    <TextField 
                        className="product-form__box-input" 
                        inputProps={{ type: 'number'}}
                        label="Grams* (g)" 
                        variant="outlined"
                        onChange={(event) => {setGramaj(event.target.value);}}
                    /> 
                </div>

                <TextField 
                    label="Description*"
                    multiline
                    rows={4} 
                    variant="outlined"
                    onChange={(event) => {setDescription(event.target.value);}}
                />

                <div 
                    className="btn-submit"
                    onClick={handleCreateClick}
                >
                    CREATE
                </div>
            </div>
        </div>
    )
}