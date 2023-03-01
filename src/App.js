import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Maincontainer from './components/Maincontainer';
import Cart from './components/Cart';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Header/>
      <Routes>
        <Route path='/' element={<Maincontainer/>} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
