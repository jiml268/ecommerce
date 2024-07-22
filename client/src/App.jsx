import './App.css'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import NavBar from './components/NavBar/NavBar';

function App() {

   return (
    <div className="App">
       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
       < NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
                
       </Routes>     
    </div>
  );
}

export default App;