import React, { useContext } from 'react';
import './Header.css'
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';


const Header = () => {

    const {user, logOut} = useContext(AuthContext);

    const handleSignOut =() =>{
        logOut()
        .then(result =>{})
        .catch(error => console.error(error))
        
    }

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
            <Link  to="/shop">Shop</Link>
            <Link  to="/orders">Orders</Link>
            <Link  to="/inventor">Inventor</Link>
            <Link  to="/login">Login</Link>
            <Link  to="/signup">Sign Up</Link>
            {user && <span className='text-white'>welcome {user.email} <button onClick={handleSignOut}>Sign Out</button></span>}
            </div>

        </nav>
    );
};

export default Header;