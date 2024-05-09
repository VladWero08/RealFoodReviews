import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import MenuItem from "./MenuItem";
import Review from "../review/Review";
import ButtonScrollToTop from "../helpers/ButtonScrollToTop";

import { restaurantContract } from "../../App";
import "./Restaurant.scss"

export default function Restaurant() {
    const { id } = useParams();
    const [showReviewArrow, setShowReviewArrow] = useState("↓");
    const [showReviews, setShowReviews] = useState(false);

    const loadRestaurant = async() => {
        await restaurantContract.methods.getRestaurant(id).call();
    }

    useEffect(() => {

    }, []);

    const handleShowReviewsClick = () => {
        if (showReviews === false) {
            setShowReviews(true);
            setShowReviewArrow("↑");
        } else {
            setShowReviews(false);
            setShowReviewArrow("↓");
        }
    }

    const rating = 4.5;
    const description = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti earum soluta, ex totam accusantium consequuntur fugit corporis! Quos, doloribus! Provident, laboriosam aliquid. Eaque obcaecati exercitationem, consequatur consequuntur distinctio accusantium blanditiis labore impedit repudiandae deserunt quo enim minima laudantium, optio reiciendis facilis ut. Modi, eaque qui mollitia assumenda aut aperiam ad.";
    const productCount = 30;
    const reviewsCount = 20;

    const menuItems = [
        {
            name: "Chicken Tikka Massala",
            price: 35,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere explicabo molestiae deleniti esse blanditiis recusandae alias error maxime. Neque voluptas quos sequi eius placeat deserunt assumenda omnis quae, fugiat amet!",
            gramaj: 450,
        },
        {
            name: "Chicken Tikka Massala 2",
            price: 35,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere explicabo molestiae deleniti esse blanditiis recusandae alias error maxime. Neque voluptas quos sequi eius placeat deserunt assumenda omnis quae, fugiat amet!",
            gramaj: 450,
        },
        {
            name: "Chicken Tikka Massala 3",
            price: 35,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere explicabo molestiae deleniti esse blanditiis recusandae alias error maxime. Neque voluptas quos sequi eius placeat deserunt assumenda omnis quae, fugiat amet!",
            gramaj: 450,
        },
        {
            name: "Chicken Tikka Massala 4",
            price: 35,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere explicabo molestiae deleniti esse blanditiis recusandae alias error maxime. Neque voluptas quos sequi eius placeat deserunt assumenda omnis quae, fugiat amet!",
            gramaj: 450,
        },
    ];

    const reviews = [
        {
            rating: 3.2,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vel veniam debitis, corporis eius dignissimos repellat numquam, repudiandae dolor, deserunt molestias ut expedita suscipit minima."
        },
        {
            rating: 4.2,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vel veniam debitis, corporis eius dignissimos repellat numquam, repudiandae dolor, deserunt molestias ut expedita suscipit minima."
        },
        {
            rating: 5,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vel veniam debitis, corporis eius dignissimos repellat numquam, repudiandae dolor, deserunt molestias ut expedita suscipit minima."
        },
        {
            rating: 1.2,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vel veniam debitis, corporis eius dignissimos repellat numquam, repudiandae dolor, deserunt molestias ut expedita suscipit minima."
        },
    ]

    return (
        <div className="restaurant__wrapper">
            <h1>Restaurant {id}</h1>
            <h3>{rating} / 5 ⭐</h3>
            <p>{description}</p>
            
            <h3 className="menu-title">
                Menu: <i>({productCount} items)</i>
            </h3>
    
            <div className="menu-items">
                {/* List all restaurants using the .map method */}
                
                {menuItems.map((menu, index) => (
                    <MenuItem 
                        index={index}
                        name={menu.name}
                        price={menu.price}
                        gramaj={menu.gramaj}
                        description={menu.description}
                    />
                ))}
            </div>

            <div className="reviews-title__wrapper">
                <h3>Reviews: <i>({reviewsCount})</i></h3>
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
                    rating={rating}
                    description={description}
                />
            )))}

            <ButtonScrollToTop/>
        </div>
    )
}