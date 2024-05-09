import { useState } from "react";
import { useSelector } from 'react-redux';

import { TextField } from "@mui/material";

import { reviewContract } from "../../App";
import "./ReviewForm.scss";

export default function ReviewForm({restaurantAddress}) {
    const userAdress = useSelector(state => state.walletAddress);

    const [rating, setRating] = useState(null);
    const [description, setDescription] = useState(null);
    
    const handleCreateClick = async () => {
        if (rating === null ||  rating < 0 || rating > 5 ) {
            alert("Rating is mandatory! (in the interval [0,5])");
            return;
        }

        if (description === null || description.length === 0) {
            alert("Description field is mandatory!");
            return;
        }

        try {
            await reviewContract.methods.addReview(restaurantAddress, description, rating).send({from: userAdress});
            window.location.reload();

        } catch (error) {
            alert("You need to buy from this restaurant in order to review it!");
        }
    }
    
    return (
        <div className="review-form">
            <TextField 
                label="Rating*" 
                className="review-inputs"
                inputProps={{ type: 'number', min: 0, max: 100}}
                variant="outlined"
                onChange={(event) => {setRating(parseInt(event.target.value));}}
            />
            <TextField 
                label="Description*" 
                className="review-inputs"
                variant="outlined"
                multiline
                rows={4}
                onChange={(event) => {setDescription(event.target.value);}}
            />  
            <div 
                className="btn-submit"
                onClick={handleCreateClick}
            >
                CREATE
            </div>
        </div>
    )
}