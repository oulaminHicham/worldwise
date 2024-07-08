import React from 'react';
import styles from './Sidebar.module.css'
import Logo from './Logo';
import AppNav from './AppNav';
import { Outlet } from 'react-router-dom';
const Sidebar = () => {
    return (
        <div className={`${styles.sidebar} bg-black text-secondary w-50 h-100 d-felx justify-content-between`}>
            <Logo />
            <AppNav/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default Sidebar;

function Footer(){
    return(
        <footer>
             <p>@copy right    <strong>world wise</strong></p>
        </footer>
    )
}