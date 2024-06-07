import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllAddresses from './pages/AllAddresses/AllAddresses';

import Home from './pages/Home/Home'

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <Routes>
        <Route path="/" element={<Home />} />
                <Route path="/alladdresses" element={<AllAddresses />} />

       </Routes>


     
    </div>
  );
}

export default App;
