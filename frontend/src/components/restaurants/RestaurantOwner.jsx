import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import MenuItem from "./MenuItem";
import Review from "../review/Review";
import ProductForm from "./ProductForm";
import ButtonScrollToTop from "../helpers/ButtonScrollToTop";

import { restaurantContract, reviewContract } from "../../App";
import "./Restaurant.scss"

export default function Restaurant() {
    const address = useSelector(state => state.walletAddress);
    const accountType = useSelector(state => state.accountType);
    const navigation = useNavigate();

    const [restaurant, setRestaurant] = useState({
        "name": null,
        "description": null,
        "productCount": 0,
        "products": [],
    });
    const [reviews, setReviews] = useState([]);
    
    const [showReviewArrow, setShowReviewArrow] = useState("↓");
    const [showReviews, setShowReviews] = useState(false);

    /**
     * Extracts the information about
     * the restaurant from the blockchain.
     */
    const loadRestaurant = async() => {
        let restaurantData = await restaurantContract.methods.getRestaurant(address).call();
        // transform the number of products from bigint to number
        restaurantData.productCount = Number(restaurantData.productCount);
        const restaurantReviews = await reviewContract.methods.getReviewsForRestaurant(address).call();
        
        setRestaurant(restaurantData);
        setReviews(restaurantReviews);
    }

    useEffect(() => {
        // check if the address entered 
        // in the URL is valid
        if (accountType !== "restaurant") {
            navigation("/restaurants");
            return;
        }

        loadRestaurant();
    }, []);

    /**
     * Computes the mean review rating, based
     * on all the reviews left by the customers.
     */
    const getReviewRating = () => {
        let reviewRating = 0;

        for (let i = 0; i < reviews.length; i++) {
            reviewRating += reviews[i].rating;
        }

        return `${(reviewRating / reviews.length).toFixed(2)} / 5 ⭐`;
    }

    /**
     * Returns the message to display
     * the overall rating of the restaurant.
     */
    const getReviewRatingMessage = () => {
        if (reviews.length == 0) {
            return "No reviews yet... ⭐";
        }

        return getReviewRating();
    }

    /**
     * Toggles between showing and not showing
     * the reviews of the users.
     */
    const handleShowReviewsClick = () => {
        if (showReviews === false) {
            setShowReviews(true);
            setShowReviewArrow("↑");
        } else {
            setShowReviews(false);
            setShowReviewArrow("↓");
        }
    }

    return (
        <div className="restaurant__wrapper">
            <h1>Restaurant {restaurant.name}</h1>
            <h3>{getReviewRatingMessage()}</h3>
            <p>{restaurant.description}</p>
            
            <ProductForm address={address}/>

            <h3 className="menu-title">
                Menu: <i>({restaurant.productCount} products)</i>
            </h3>
    
            <div className="menu-items">
                {/* List all restaurants using the .map method */}
                
                {restaurant.products.map((product, index) => (
                    <MenuItem 
                        index={index}
                        name={product.name}
                        price={Number(product.price)}
                        gramaj={product.gramaj}
                        description={product.description}
                        addable={false}
                    />
                ))}
            </div>

            <div className="reviews-title__wrapper">
                <h3>Reviews: <i>({reviews.length})</i></h3>
                <h3 
                    className="btn-reviews-show"
                    onClick={() => {handleShowReviewsClick()}}
                >
                    Show {showReviewArrow}
                </h3>
            </div>

            {showReviews && (reviews.map((review, index) => (
                <Review
                    index={index}
                    rating={review.rating}
                    description={review.description}
                />
            )))}

            <ButtonScrollToTop/>
        </div>
    )
}