import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <button className='btn bg-dark text-white' onClick={()=>navigate(-1)}>
            &larr; Back
        </button>
    );
}

export default BackButton;
