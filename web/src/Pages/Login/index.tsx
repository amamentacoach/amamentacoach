import React, {FormEvent, useState} from 'react';

import logo from '../../Assets/logo.svg';
import { useAuth } from '../../Contexts/auth';


const Login: React.FC = () => {

  const [password, setPassword] = useState<string>('')

  const auth = useAuth()


  function handleLogin(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    auth.Login(password);
  }

  return (
      <div className="container" style={{backgroundColor:'#7D5CD7'}}>
          <div className="row">
              <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                  <div id="logo" style={{display:'flex', justifyContent:'center'}}>
                    <img src={logo} alt="Logo"/>
                  </div>
                  <form onSubmit={handleLogin} className="card card-signin my-5">
                      <div className="card-body">
                          <h5>Digite a senha de acesso administrativo para continuar.</h5>
                          <div className="form-signin" id="form-login">
                              <div className="form-group">
                                  <input type="password" value={password} onChange={ e => setPassword(e.target.value)} className="form-control" placeholder="Digite a senha" required autoFocus/>
                              </div>
                              <button className="btn btn-lg btn-primary btn-block" type="submit" style={{backgroundColor:'#7D5CD7', borderColor:'#7D5CD7', paddingTop:10}}>
                                  Continuar
                              </button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  );
};

export default Login;