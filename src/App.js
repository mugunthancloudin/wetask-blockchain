import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
        <Route path='/' element={<LandingPage/>} />
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
