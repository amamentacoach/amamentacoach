import React from 'react';

import logo from '../../Assets/logo.svg';

const Home: React.FC = () => {
  return (
    <div className="container" style={{backgroundColor:'#7D5CD7'}}>
        <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div id="logo" style={{display:'flex', justifyContent:'center'}}>
                  <img src={logo} alt="Logo"/>
                </div>
                <button>
                  <div>
                    <h1>Teste</h1>
                  </div>
                </button>
                <button>
                  <div>
                    <h1>Teste</h1>
                  </div>
                </button>
            </div>
        </div>
    </div>
  );
};

export default Home;
