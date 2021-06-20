import React, {useEffect} from "react";
import SuperNav from "../Navbar/SuperNav";
import ReactGA from "react-ga";
import {withRouter} from "react-router-dom";


const Home =()=>{

    ReactGA.initialize('G-CFDLFDX45S')
    useEffect(()=>{
        ReactGA.pageview(window.location.pathname + window.location.search);
    })
    return(
        <>
            <SuperNav
        label='Bienvenu'
        />
        </>
    )
}
export default withRouter(Home)