import "./MenuItem.scss"

export default function MenuItem(props) {
    const {index, productID, name, price, gramaj, description, addable, products, setProducts} = props;

    const getProduct = () => {
        return {
            "productID": productID,
            "name": name,
            "price": price,
            "gramaj": gramaj,
            "description": description,
        }
    }

    return (
        <div key={index} className="menu-item">
            <div className="menu-item-title__wrapper">
                <h2 className="menu-item-title">{name}</h2>
                {addable && (
                    <h2 
                        className="menu-item-add"
                        onClick={() => {setProducts([...products, getProduct()])}}
                    >+</h2>
                )}
            </div>

            <div className="menu-item-details__wrapper">
                <h5 className="menu-item-price">{price} ETH</h5>
                <h5>{gramaj} g</h5>
            </div>
            
            <p className="menu-item-description">{description}</p>
        </div>
    )
}