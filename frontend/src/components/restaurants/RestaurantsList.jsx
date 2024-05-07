import { useState } from "react"
import { Link } from "react-router-dom"
import "./RestaurantsList.scss"

import ButtonScrollToTop from "../helpers/ButtonScrollToTop";

export default function RestaurantsList() {
    const [restaurants, setRestaurants] = useState([
        {
            "name": "Maki Sushi 1",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quia ex consequatur totam unde beatae iure mollitia repudiandae, possimus doloribus",
            "productCount": 30,
            "rating": 4.5
        },
        {
            "name": "Maki Sushi 2",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quia ex consequatur totam unde beatae iure mollitia repudiandae, possimus doloribus",
            "productCount": 40,
            "rating": 4.6
        },
        {
            "name": "Maki Sushi 3",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quia ex consequatur totam unde beatae iure mollitia repudiandae, possimus doloribus",
            "productCount": 50,
            "rating": 4.8
        },
        {
            "name": "Maki Sushi 4",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quia ex consequatur totam unde beatae iure mollitia repudiandae, possimus doloribus",
            "productCount": 60,
            "rating": 4.7
        },
    ]);
    const [sortActiveOption, setSortActiveOption] = useState(null); 
    const sortOptions = [
        "⭐ ASC",
        "⭐ DESC",
        "Products ASC",
        "Products DESC"
    ];

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
                            <Link to={`/restaurants/${index}`}>See the menu</Link>
                        </div>
    
                        <div className="restaurant-card-details__wrapper">
                            <h5 className="restaurant-card-products">{restaurant.productCount} Products</h5>
                            <h5>{restaurant.rating} / 5 ⭐</h5>
                        </div>
                        
                        <p className="restaurant-card-description">{restaurant.description}</p>
                    </div>    
                ))}
            </div>

            <ButtonScrollToTop/>
        </div>  
    )
}