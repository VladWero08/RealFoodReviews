import "./Review.scss";

export default function Reviews({index, rating, description}) {
    return (
        <div
            key={index} 
            className="review__wrapper"
        >
            <h3 style={{"padding": 0}}>{rating} / 5 ⭐</h3>
            <p>{description}</p>
        </div>
    )
}