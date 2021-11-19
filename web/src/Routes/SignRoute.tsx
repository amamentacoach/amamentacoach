import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Login from '../Pages/Login';

const SignRoutes: React.FC = () => {
 return (
   <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="*" element={<Navigate to="/"/>} />
        </Routes>   
   </BrowserRouter>
 );
};

export default SignRoutes;