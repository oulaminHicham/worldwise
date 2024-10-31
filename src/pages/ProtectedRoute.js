import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {isAthenticated} = useAuth();

    const navigate=useNavigate();

    useEffect(function(){
        if(!isAthenticated) return navigate('/')
    },[isAthenticated , navigate])

    return isAthenticated ? children : null ;
}

export default ProtectedRoute;


