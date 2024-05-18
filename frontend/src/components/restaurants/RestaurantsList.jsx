import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./RestaurantsList.scss"

import ButtonScrollToTop from "../helpers/ButtonScrollToTop";
import { restaurantContract, reviewContract } from "../../App";

export default function RestaurantsList() {
    const [restaurants, setRestaurants] = useState([]);
    const [sortActiveOption, setSortActiveOption] = useState(null); 
    const sortOptions = [
        "⭐ ASC",
        "⭐ DESC",
        "Products ASC",
        "Products DESC"
    ];

    useEffect(() => {
        async function loadRestaurants() {
            const restaurantsObjects = [];
            const restaurantsInBlockchain = await restaurantContract.methods.getAllRestaurants().call();

            for (let i = 0; i < restaurantsInBlockchain.restaurantNames.length; i++) {
                const address = restaurantsInBlockchain.restaurantAddresses[i];
                const name = restaurantsInBlockchain.restaurantNames[i];;
                const description = restaurantsInBlockchain.restaurantDescriptions[i];
                const productCount = Number(restaurantsInBlockchain.restautrantProductCounts[i]);
                
                const reviews = await reviewContract.methods.getReviewsForRestaurant(address).call();
                const reviewRating = getReviewRatingMessage(reviews);

                restaurantsObjects.push({
                    "address": address,
                    "name": name,
                    "description": description,
                    "productCount": productCount,
                    "rating": reviewRating,
                });
            }
        
            setRestaurants(restaurantsObjects);
        }

        loadRestaurants();
    }, []);

    /**
     * Computes the mean review rating, based
     * on all the reviews left by the customers.
     */
    const getReviewRating = (reviews) => {
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
    const getReviewRatingMessage = (reviews) => {
        if (reviews.length == 0) {
            return "No reviews yet... ⭐";
        }

        return getReviewRating(reviews);
    }

    const handleSortOptionClick = (sortType) => {
        let sortedRestaurants;

        switch (sortType) {
            // sort by rating ascending
            case 0:
                sortedRestaurants = restaurants.sort((a, b) => a.rating - b.rating);
                break;
            // sort by rating descending
            case 1:
                sortedRestaurants = restaurants.sort((a, b) => b.rating - a.rating);
                break;
            // sort by product count ascending
            case 2: 
                sortedRestaurants = restaurants.sort((a, b) => a.productCount - b.productCount);
                break;
            // sort by product count descending
            case 3:
                sortedRestaurants = restaurants.sort((a, b) => b.productCount - a.productCount);
                break;
        }

        // also set the current active option, in order
        // to add a special class to it, to be distinguished 
        // from the rest
        setSortActiveOption(sortType);
        setRestaurants(sortedRestaurants);
    }

    return (
        <div className="restaurants-list__wrapper">
            <h1>🍲 Our restaurants:</h1>
            <p className="restaurants-list__description">Embark on a culinary journey through our curated list of restaurants renowned for their authentic dining experiences. Indulge your senses in a world of flavorful dishes crafted with care and passion. Each restaurant on our list has been meticulously selected for its outstanding reputation, genuine reviews, and mouthwatering cuisine.</p>
            
            <h3>Sort by:</h3>
            <div className="sort-options">
                {/* 
                    List all sorting options using the .map method, 
                    and set the .onClickMethod for each one to modify 
                    the list of restaurants.
                */}

                {sortOptions.map((sortOption, index) => {
                    return index != sortActiveOption ?
                    <div 
                        key={index} 
                        onClick={() => {handleSortOptionClick(index)}}
                        className="sort-option"
                    >{sortOption}</div>
                    :
                    <div 
                        key={index} 
                        onClick={() => {handleSortOptionClick(index)}}
                        className="sort-option sort-option-active"
                    >{sortOption}</div>
                })}
            </div>

            <div className="restaurants-card-list">
                {/* List all restaurants using the .map method */}
                
                {restaurants.map((restaurant, index) => (
                    <div key={index} className="restaurant-card">
                        <div className="restaurant-card-title__wrapper">
                            <h2 className="restaurant-card-title">{restaurant.name}</h2>
                            <Link to={`/restaurants/${restaurant.address}`}>See the menu</Link>
                        </div>
    
                        <div className="restaurant-card-details__wrapper">
                            <h5 className="restaurant-card-products">{restaurant.productCount} Products</h5>
                            <h5>{restaurant.rating}</h5>
                        </div>
                        
                        <p className="restaurant-card-description">{restaurant.description}</p>
                    </div>    
                ))}
            </div>

            <ButtonScrollToTop/>
        </div>  
    )
}