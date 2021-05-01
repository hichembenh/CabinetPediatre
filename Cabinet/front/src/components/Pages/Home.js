import React from "react";
import SuperNav from "../Navbar/SuperNav";
import Navbar from "../Navbar/Navbar";
import {BrowserRouter as Router} from "react-router-dom";


const Home =()=>{


    return(
        <>
            <Navbar />
            <SuperNav
        src="./videos/baby.mp4"
        label='Bienvenu'
        />
        </>
    )
}
export default Home