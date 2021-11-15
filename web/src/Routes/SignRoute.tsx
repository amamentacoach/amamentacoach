import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from '../Pages/Login';

const SignRoutes: React.FC = () => {
 return (
   <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
        </Routes>   
   </BrowserRouter>
 );
};

export default SignRoutes;