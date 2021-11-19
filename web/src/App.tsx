import { AuthProvider } from './Contexts/auth';
import Routes from './Routes';


function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App;