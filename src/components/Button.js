import React from 'react';

// import styles from './Button.module.css'

const Button = ({children , onClick , type}) => {
    return (
        <button className={`btn text-white bg-${type}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
