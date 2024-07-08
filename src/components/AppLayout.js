import React from 'react';
import Sidebar from './sidebar';
import Map from './Map';
import User from './User';
import ProtectedRoute from '../pages/ProtectedRoute';

const AppLayout = () => {
    return (
        <>
            <div className='d-flex' style={{height:'1000px'}}>
                <ProtectedRoute>
                    <User/>
                    <Sidebar/>
                    <Map />
                </ProtectedRoute>
            </div>
        </>
        );
}

export default AppLayout;
