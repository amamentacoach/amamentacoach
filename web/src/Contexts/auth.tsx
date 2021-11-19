import {  useState, useEffect, createContext, useContext } from 'react';
import api from '../Services/api';

interface AuthContextData {
  signed: boolean;
  Login: (password:String) => Promise<void>;
}
 
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

  const [token, setToken] = useState('');

  async function Login(password:String) {
      
    const response = await api.post('/admin/auth', {
      password
    });
    setToken(response.data.token)
    localStorage.setItem('@App:token', response.data.token);
  }

  useEffect(() => {

    async function verifyAuth(){
      const storagedToken = localStorage.getItem('@App:token');
      if(storagedToken){
        api.defaults.headers.common['Authorization'] = storagedToken;
        setToken(storagedToken) 
      }
    }
  verifyAuth(); 
  },[]);

  return (
    <AuthContext.Provider value={{ signed: Boolean(token), Login }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(){
  const context = useContext(AuthContext);
 
  return context;
}
