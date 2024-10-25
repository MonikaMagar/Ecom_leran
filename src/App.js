import React, { useState } from 'react'; // Import useState
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Store } from './store';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Cart from './Components/Cart';
import Footer from './Components/Footer';
import Wishlist from './Components/Wishlist';


function App() {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  return (
    <div>
      <Store>
        <BrowserRouter>
          <Navigation searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Routes>
            <Route path='/' element={<Home searchTerm={searchTerm} />} />
            <Route path='/cart' element={<Cart />} />
           <Route path='/wishlist' element={<Wishlist/>}/>
            
          </Routes>
          <Footer />
        </BrowserRouter>
      </Store>
    </div>
  );
}

export default App;
