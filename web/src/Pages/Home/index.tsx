import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../Assets/logo.svg';

const Home: React.FC = () => {
  return (
    <div className="container" style={{backgroundColor:'#7D5CD7'}}>
        <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div id="logo" style={{display:'flex', justifyContent:'center'}}>
                  <img src={logo} alt="Logo"/>
                </div>

                <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}>
                  <NavLink className="link-menu" to="/mothers" style={{flex:1, display:'flex'}}>
                    <button className="btn-menu" style={{flex:1, margin:5, minHeight:100}}>
                      Maes
                    </button>
                  </NavLink>
                </div>


            </div>
        </div>
    </div>
  );
};

export default Home;
