import "./Home.scss";
import etherum from "../../assets/ethereum.png";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home__wrapper">
            <div className="home__text">
                <div>
                    <h1>RealFoodReviews: <br/> Authentic Dining Experiences on ETH</h1>
                    <p>🍽️ Welcome to RealFoodReviews, where genuine feedback meets secure transactions. 
                        <br/><br/>
                        Join us on Ethereum to support local restaurants and ensure authentic dining experiences. Say no to fake reviews and yes to real food adventures! 🌟
                    </p>
                    <div className="home__buttons">
                        <button className="btn btn-home btn-restaurants">
                            <Link to="/restaurants">Restaurants</Link>
                        </button>
                        <button className="btn btn-home btn-register">
                            <Link to="/register">Register</Link>
                        </button>
                    </div>
                </div>
            </div>
            <div className="home__illustration">
                <img
                    className="ethereum-logo" 
                    src={etherum} 
                    alt="etherum" 
                />
            </div>
        </div>
    )
}

export default Home;