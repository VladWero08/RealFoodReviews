import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { isAddress } from "web3-validator";

import MenuItem from "./MenuItem";
import Review from "../review/Review";
import ReviewForm from "../review/ReviewForm";
import ButtonScrollToTop from "../helpers/ButtonScrollToTop";
import ShoppingCart from "./ShoppingCart";

import { restaurantContract, reviewContract } from "../../App";
import "./Restaurant.scss"

export default function Restaurant() {
    const { id } = useParams();
    const navigation = useNavigate();

    const [restaurant, setRestaurant] = useState({
        "name": null,
        "description": null,
        "productCount": 0,
        "products": [],
    });
    const [reviews, setReviews] = useState([]);
    const [products, setProducts] = useState([]); 
    
    const [showReviewArrow, setShowReviewArrow] = useState("↓");
    const [showReviews, setShowReviews] = useState(false);

    /**
     * Extracts the information about
     * the restaurant from the blockchain.
     */
    const loadRestaurant = async() => {
        let restaurantData = await restaurantContract.methods.getRestaurant(id).call();
        // transform the number of products from bigint to number
        restaurantData.productCount = Number(restaurantData.productCount);
        const restaurantReviews = await reviewContract.methods.getReviewsForRestaurant(id).call();
        
        setRestaurant(restaurantData);
        setReviews(restaurantReviews);
    }

    useEffect(() => {
        // check if the address entered 
        // in the URL is valid
        if (!isAddress(id)) {
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
            reviewRating += Number(reviews[i].rating);
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
            <div className="restaurant-title__wrapper">
                <div>
                    <h1>Restaurant {restaurant.name}</h1>
                    <h3>{getReviewRatingMessage()}</h3>
                </div>
                <ShoppingCart
                    restaurantAddress={id} 
                    products={products} 
                    setProducts={setProducts}
                />
            </div>
            
            <p>{restaurant.description}</p>
            
            <h3 className="menu-title">
                Menu: <i>({restaurant.productCount} products)</i>
            </h3>
    
            <div className="menu-items">
                {/* List all restaurants using the .map method */}
                
                {restaurant.products.map((product, index) => (
                    <MenuItem 
                        index={index}
                        productID={Number(product.productID)}
                        name={product.name}
                        price={Number(product.price)}
                        gramaj={product.gramaj}
                        description={product.description}
                        addable={true}

                        products={products}
                        setProducts={setProducts}
                    />
                ))}
            </div>

            <h3>Add a review:</h3>
            <ReviewForm restaurantAddress={id}/>

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
                    rating={Number(review.rating)}
                    description={review.description}
                />
            )))}

            <ButtonScrollToTop/>
        </div>
    )
}