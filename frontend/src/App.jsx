import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./components/home/Home";
import Navbar from "./components/navigation/Navbar";
import Orders from "./components/orders/Orders";
import Restaurant from "./components/restaurants/Restaurant";
import RestaurantOwner from "./components/restaurants/RestaurantOwner";
import RestaurantsList from "./components/restaurants/RestaurantsList";
import Register from "./components/authentication/Register";
import SignIn from "./components/authentication/SignIn";

import Web3 from "web3";
import { 
  ethTransferAbi, ethTransferAddress, 
  myERC20Abi, myERC20Address, 
  restaurantAbi, restaurantAddress, 
  reviewAbi, reviewAddress, 
  userAbi, userAddress 
} from "../utils/constants";

const web3 = new Web3("http://localhost:8545");
export const ethTransferContract = new web3.eth.Contract(ethTransferAbi, ethTransferAddress);
export const myERC20Contract = new web3.eth.Contract(myERC20Abi, myERC20Address);
export const restaurantContract = new web3.eth.Contract(restaurantAbi, restaurantAddress);
export const reviewContract = new web3.eth.Contract(reviewAbi, reviewAddress);
export const userContract = new web3.eth.Contract(userAbi, userAddress);

function App() {
  // get the current location using the location hook
  const location = useLocation();
  
  // check whether the navbar needs to be rendered or not,
  // for register and sign in it should not be rendered
  const showNavbar = location.pathname !== "/register" && location.pathname !== "/sign-in";

  return (
      <>        
        {showNavbar && <Navbar/>}
        
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/user/my-orders/" element={<Orders/>}/>
          <Route path="/restaurants/my-restaurant/" element={<RestaurantOwner/>}/>
          <Route path="/restaurants" element={<RestaurantsList/>}/>
          <Route path="/restaurants/:id" element={<Restaurant/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>
        </Routes>
      </>
  )
}

export default App;
