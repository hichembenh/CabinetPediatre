import React, {useEffect} from "react";
import SuperNav from "../Navbar/SuperNav";
import ReactGA from "react-ga";
import {withRouter} from "react-router-dom";


const Home =()=>{

    return(
        <>
            <SuperNav
        label='Bienvenu'
        />
        </>
    )
}
export default Home