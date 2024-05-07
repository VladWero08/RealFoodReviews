import "./Review.scss";

export default function Reviews({index, rating, description}) {
    return (
        <div
            key={index} 
            className="review__wrapper"
        >
            <h3>{rating} / 5 ⭐</h3>
            <p>{description}</p>
        </div>
    )
}