import './App.css';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUpPage from './Pages/SignUpPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route Component={LoginPage} path='/login' />
          <Route Component={HomePage} path='/home' />
          <Route Component={SignUpPage} path='/signup' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
