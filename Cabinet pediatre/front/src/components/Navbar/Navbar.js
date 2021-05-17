import React,{useState, useEffect} from 'react';
import {Link, useHistory,useLocation} from 'react-router-dom';
import './Navbar.css';
import { Button } from './Button';
import {useDispatch} from "react-redux";


export default function Navbar (){
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [user,setUser] = useState();

    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);
    const disp = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const login = () =>{
        setUser((JSON.parse(localStorage.getItem('profile'))))
    }
    useEffect(()=>{
        setUser((JSON.parse(localStorage.getItem('profile'))))
    },[location]);

    const logout = () =>{
        setUser(null)
        disp({type:'LOGOUT'})
        history.push('/sign-up')
    }

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };
    window.addEventListener('resize',showButton);
    useEffect(()=>{
        showButton()
    })

    return(
        <>
            <nav className='navbar'>
                <div className="navbar-container">
                    <Link to={!user? ('/'):('/profile')} className='navbar-logo' onClick={closeMobileMenu}>
                        {user ? ('Bienvenu '+user.result.firstName):('Accueil')}
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <span className={click ? 'fas fa-times':'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Accueil
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/Servives' className='nav-links' onClick={closeMobileMenu}>
                                Services
                            </Link>
                        </li>
                        {user && !user.result.isSec && !user.result.isAdmin &&(
                            <>
                            <li className='nav-item'>
                                <Link to='/kids' className='nav-links' onClick={closeMobileMenu}>
                                    Mes enfants
                                </Link>
                            </li>
                            </>
                        )}
                        {user && (user.result.isSec || user.result.isAdmin) && (
                            <li className='nav-item'>
                                <Link to={user.result.isSec ? '/secretaire':'/doctor'} className='nav-links' onClick={closeMobileMenu}>
                                    Dashboard
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link
                                to='/sign-in'
                                className='nav-links-mobile'
                                onClick={closeMobileMenu}
                            >
                                {user ? ('Logout'):('Sign Up')}
                            </Link>
                        </li>
                    </ul>
                        {button && (user?
                                (<Button buttonStyle='btn--outline' className='nav-links' onClick={logout} link='/'>Se deconnecter</Button>
                                ):(
                                <Button buttonStyle='btn--outline' className='nav-links' onClick={login && closeMobileMenu} link='/sign-up'>S'identifier</Button>))}
                </div>

            </nav>

        </>
    )
}
