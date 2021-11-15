import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';

const SignRoutes: React.FC = () => {
 return (
   <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
        </Routes>   
   </BrowserRouter>
 );
};

export default SignRoutes;