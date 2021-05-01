import React, {useState} from "react";
import {Link} from "react-router-dom";


const Ref = () =>{
    const [click, setClick] = useState(false);

    const closeMobileMenu = () => setClick(false);
    return(
        <li className='nav-item'>
            <Link to='/Vaccin' className='nav-links' onClick={closeMobileMenu}>
                Mes vaccins
            </Link>
        </li>
    )
}

export default Ref