import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Baby from '../Pages/Baby';
import Home from '../Pages/Home';
import Mother from '../Pages/Mother';
import Mothers from '../Pages/Mothers';

const SignRoutes: React.FC = () => {
 return (
   <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/mothers" element={<Mothers/>} />
            <Route path="/mothers/:id" element={<Mother/>} />
            <Route path="/babies/:id" element={<Baby/>} />
        </Routes>   
   </BrowserRouter>
 );
};

export default SignRoutes;