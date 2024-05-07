import "./MenuItem.scss"

export default function MenuItem({index, name, price, gramaj, description}) {
    return (
        <div key={index} className="menu-item">
            <div className="menu-item-title__wrapper">
                <h2 className="menu-item-title">{name}</h2>
                <h2 className="menu-item-add">+</h2>
            </div>

            <div className="menu-item-details__wrapper">
                <h5 className="menu-item-price">{price} ETH</h5>
                <h5>{gramaj} g</h5>
            </div>
            
            <p className="menu-item-description">{description}</p>
        </div>
    )
}