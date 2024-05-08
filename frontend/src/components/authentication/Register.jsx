import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import MetamaskButtonConnect from "../metamask/MetamaskButtonConnect";
import { userContract, restaurantContract } from "../../App";

import logo from "../../assets/logo.png";

import "./Authentication.scss";
import { setAccountType } from "../../actions";

export default function Register() {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const address = useSelector(state => state.walletAddress);

    const [checked, setChecked] = useState(false);
    const [restaurantName, setRestaurantName] = useState(null);
    const [restaurantDescription, setRestaurantDescription] = useState(null);

    const handleRegistrationTypeChange = (event) => {
      setChecked(event.target.checked);
    };

    /**
     * Handles the click on the "CREATE" button,
     * and fires the specific handler depending
     * on the type of account the user wants to create: user or restaurant.
     */
    const handleCreateClick = async () => {
        if (checked === true) { 
            await handleCreateRestaurant();
        } else {
            await handleCreateUser();
        }
    }

    /**
     * Creates an user account if the Metamask account
     * is connected and if it does not exists already.
     */
    const handleCreateUser = async () => {
        // check if the user connected his Metamask account
        if (address === null) {
            alert("You need to connect your Metamask account first!");
            return;
        } 

        // try to create the account
        await userContract.methods.createUser(address).send({from: address})
            .on("error", (error) => {
                alert("The account could not be created. Try again.");
                return;
            });   
            
        // also set the account type in redux 
        // and local storage to "user"
        dispatch(setAccountType("user"));
        localStorage.setItem("accountType", "user");
        // if the account was created successfully,
        // return to the main page
        navigation("/");
    }

    const handleCreateRestaurant = async () => {
        // check if the user connected his Metamask account
        if (address === null) {
            alert("You need to connect your Metamask account first!");
            return;
        } 

        if (restaurantName === null || restaurantDescription === null) {
            alert("All fields need to be completed to create a restaurant!");
            return;
        }

        await restaurantContract.methods.createRestaurant(address, restaurantName, restaurantDescription).send({from: address})
            .on("error", (error) => {
                alert("The account could not be created. Try again.");
                return;
            })

        // also set the account type in redux 
        // and local storage to "restaurant"
        dispatch(setAccountType("restaurant"));
        localStorage.setItem("accountType", "restaurant");
        // if the account was created succesfully,
        // return to the main page
        navigation("/");
    }

    return (
        <div className="registration__wrapper">
            <div className="registration__left">
                <Link to="/">
                    <div className="registration__left-title">
                        <img src={logo} alt="logo"/>
                        <h1>Real Food Reviews</h1>
                    </div>
                </Link>
                <p>Welcome to our revolutionary dining platform, where convenience meets innovation! 🍽️✨ Register now to embark on a seamless culinary journey fueled by Ethereum.
                <br></br><br></br>
                Whether you're a food enthusiast eager to explore a diverse range of cuisines or a restaurant owner ready to elevate your business to new heights, our platform caters to your needs. With the power of ETH, payment transactions are swift, secure, and hassle-free, ensuring a delightful dining experience for all.
                <br></br><br></br>
                Join our vibrant community today as a user to savor delectable dishes from top-notch restaurants or as a restaurant to showcase your culinary masterpieces and connect with eager foodies. The possibilities are endless, and the flavors are irresistible!
                <br></br><br></br>
                Sign up now and let's embark on this exciting gastronomic adventure together! 🚀🍴
                </p>
            </div>

            <div className="registration__right">
                <div className="registration__right-title">
                    <h1>Registration</h1>
                    <Switch
                        checked={checked}
                        onChange={handleRegistrationTypeChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        sx={{
                            '& .MuiSwitch-thumb': {
                              color: "#BFEA7C", // Change this to your custom color
                            },
                            '& .Mui-checked': {
                              color: "#BFEA7C", // Change this to your custom color
                            },
                            '& .MuiSwitch-track': {
                              backgroundColor: "#BFEA7C", // Change this to your custom color
                            },
                            '& .css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: "#BFEA7C",
                            }
                        }}
                    />
                </div>

                <h3 className="registration__right-type">
                    as a {checked ? "restaurant" : "user"}
                </h3>
                
                {checked == true &&
                    <div className="registration-inputs">
                        <TextField 
                            id="outlined-basic" 
                            label="Name" 
                            variant="outlined"
                            onChange={(event) => {setRestaurantName(event.target.value);}}
                        /> 
                        <div className="registration-inputs__spacing"></div>
                        <TextField
                            label="Description"
                            multiline
                            rows={4}
                            variant="outlined"
                            onChange={(event) => {setRestaurantDescription(event.target.value);}}
                        />     
                    </div>
                }

                <div className="btns-wrapper">
                    <MetamaskButtonConnect/>
                    <div 
                        className="btn-create"
                        onClick={handleCreateClick}    
                    >
                        CREATE
                    </div>
                </div>
            </div>


        </div>
    )
}