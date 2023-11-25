import './App.css';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUpPage from './Pages/SignUpPage';

import RequireAuth from './Components/RequireAuth';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<SignUpPage />} path='/signup' />
          <Route element={<LoginPage />} path='/login' />
          <Route element={<RequireAuth />}>
            <Route element={<HomePage />} path='/' />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
