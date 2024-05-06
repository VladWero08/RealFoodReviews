import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/navigation/Navbar";
import Restaurant from "./components/restaurants/Restaurant";
import RestaurantsList from "./components/restaurants/RestaurantsList";
import Register from "./components/authentication/Register";
import SignIn from "./components/authentication/SignIn";
import AddRestaurantForm from './AddRestaurantForm';

import Web3 from "web3";
import { ethTransferAbi, ethTransferAddress, myERC20Abi, myERC20Address, restaurantAbi, 
  restaurantAddress, reviewAbi, reviewAddress, userAbi, userAddress } from "./utils/constants";

const web3 = new Web3("http://localhost:8545");
const ethTransferContract = new web3.eth.Contract(ethTransferAbi, ethTransferAddress);
const myERC20Contract = new web3.eth.Contract(myERC20Abi, myERC20Address);
const restaurantContract = new web3.eth.Contract(restaurantAbi, restaurantAddress);
const reviewContract = new web3.eth.Contract(reviewAbi, reviewAddress);
const userContract = new web3.eth.Contract(userAbi, userAddress);

function App() {
  const [restaurantCount, setRestaurantCount] = useState(null);

  const createRestaurant = async (metaMaskID, name, description) => {
    try {
      console.log("Creating restaurant...");
      // Assuming the contract method is named createRestaurant and takes three parameters
      await restaurantContract.methods.createRestaurant(metaMaskID, name, description).send({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' });
      console.log("Restaurant created successfully!");                                              
      // After successfully creating the restaurant, you may want to update the restaurant count in state
      setRestaurantCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error creating restaurant:", error);
    }
  };

  const fetchRestaurantCount = async () => {
    try {
      console.log("Fetching restaurant count...");
      const count = await restaurantContract.methods.getRestaurantCount().call();
      console.log("Restaurant count:", count);
      setRestaurantCount(count);
    } catch (error) {
      console.error("Error fetching restaurant count:", error);
    }
  };

  useEffect(() => {
    fetchRestaurantCount();
  }, []);

  const handleClick = () => {
    fetchRestaurantCount();
  };

  // get the current location using the location hook
  const location = useLocation();
  
  // check whether the navbar needs to be rendered or not,
  // for register and sign in it should not be rendered
  const showNavbar = location.pathname !== "/register" && location.pathname !== "/sign-in";

  return (
    <>
      <div>
        <h1>Restaurant Management System</h1>
        <p>Total Restaurants: {restaurantCount}</p>
        <AddRestaurantForm createRestaurant={createRestaurant} />
        {/* Other components and content */}
      </div>
      
      {showNavbar && <Navbar/>}
      
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/restaurants" element={<RestaurantsList/>}/>
        <Route path="/restaurants/:id" element={<Restaurant/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
      </Routes>

      <button onClick={handleClick}>Fetch Restaurant Count</button>
      {restaurantCount !== null && (
        <p>Restaurant Count: {restaurantCount}</p>
      )}
    </>
  );
}

export default App;
