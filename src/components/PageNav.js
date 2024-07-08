import React from 'react';
import styling from './PageNav.module.css'
import { Link } from 'react-router-dom';
import Logo from './Logo';
const PageNav = () => {
    return (
        <nav className={styling.nav}>
            <Logo />
            <ul>  
                <Link to='/product' className='text-white hover'>Product</Link>
                <Link to='/pricing' className='text-white'>Pricing</Link>
                <Link to='/login' className='text-white bg-success px-4 rounded-2'>Login</Link>
            </ul>
        </nav>
    );
}

export default PageNav;
