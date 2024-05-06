import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./components/home/Home";
import Navbar from "./components/navigation/Navbar";
import Restaurant from "./components/restaurants/Restaurant";
import RestaurantsList from "./components/restaurants/RestaurantsList";
import Register from "./components/authentication/Register";
import SignIn from "./components/authentication/SignIn";

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
          <Route path="/restaurants" element={<RestaurantsList/>}/>
          <Route path="/restaurants/:id" element={<Restaurant/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>
        </Routes>
      </>
  )
}

export default App;
