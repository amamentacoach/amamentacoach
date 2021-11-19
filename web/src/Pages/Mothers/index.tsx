import React, { FormEvent, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../Assets/logo.svg';
import api from '../../Services/api';

interface IMother{
  id: number;
  nome: string;
}

const Mothers: React.FC = () => {

  const [mothers, setMothers] = useState<IMother[]>([]);
  const [name, setName] = useState<string>('')

  async function handleSearch(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    const response = await api.get(`/admin/mothers?name=${name}`)
    setMothers(response.data)
  }

  useEffect(() =>{
    const Authorization = localStorage.getItem('@App:token') || '';
    (async ()=>{
      const response = await api.get('/admin/mothers',{headers:{Authorization}});
      setMothers(response.data);
    })();
  }, [])

  return (
    <div className="container" style={{backgroundColor:'#7D5CD7'}}>
        <div className="row">
            <div id="logo" style={{display:'flex', justifyContent:'center', paddingBottom:50}}>
              <img src={logo} alt="Logo"/>
            </div>
            <div className="card" style={{display:'flex', justifyContent:'center'}}>
              <div className="card-body">
                <h2>Cadastros</h2>
                <form onSubmit={handleSearch}>
                  <input placeholder="Digite o nome da mae" value={name} onChange={ e => setName(e.target.value)}/>
                  <button type='submit'>search</button>
                </form>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id.</th>
                            <th scope="col">Nome</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {mothers.map((mother) => (
                            <tr key={mother.id}>
                                <td>{mother.id}</td>
                                <td>{mother.nome}</td>
                                <td><NavLink to={`/mothers/${mother.id}`}>Editar</NavLink></td>
                            </tr>
                        ))}
                    </tbody>
                </table>      
              </div>
            </div>  
        </div>
      </div>
  );
};

export default Mothers;
