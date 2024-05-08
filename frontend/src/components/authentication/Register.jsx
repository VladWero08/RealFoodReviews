import { useState } from "react";
import { Link } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import MetamaskButtonConnect from "../metamask/MetamaskButtonConnect";

import logo from "../../assets/logo.png";

import "./Authentication.scss";

export default function Register() {
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

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
                        onChange={handleChange}
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
                        <TextField id="outlined-basic" label="Name" variant="outlined"/> 
                        <div className="registration-inputs__spacing"></div>
                        <TextField
                            label="Description"
                            multiline
                            rows={4}
                            variant="outlined"
                        />     
                    </div>
                }

                <MetamaskButtonConnect/>
            </div>


        </div>
    )
}