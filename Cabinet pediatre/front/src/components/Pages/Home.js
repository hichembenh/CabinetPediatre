import React, {useEffect} from "react";
import SuperNav from "../Navbar/SuperNav";
import ReactGA from "react-ga";
import {withRouter} from "react-router-dom";


const Home =()=>{

    ReactGA.initialize('UA-200174338-1')
    useEffect(()=>{
        ReactGA.pageview(window.location.pathname + window.location.search);
    },[])
    return(
        <>
            <SuperNav
        label='Bienvenu'
        />
        </>
    )
}
export default Home