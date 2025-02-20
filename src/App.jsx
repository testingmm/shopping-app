import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './components/Header';

function App() {
  const [cart, setCart] = useState([]);
  return (
    <>
      <Header cartItems={cart.length} />
      <Outlet context={{ cart, setCart }} />
    </>
  )
}

export default App
