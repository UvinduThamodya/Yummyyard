import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import Homepage from "./components/HomePage"; // Import the Homepage component
import Menu from './components/Menu'; // Corrected the import path for the Menu component
import "./App.css";
import PlaceOrder from "./components/PlaceOrder"; // Import the PlaceOrder component
import AboutContact from './components/AboutContact';  // Import AboutContact

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={< Menu />} /> {/* Set Menu as the default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/placeorder" element={<PlaceOrder/>} />
        <Route path="/" element={< Homepage />} /> {/* Add AboutContact route */}
        <Route path="/aboutcontact" element={<AboutContact />} /> {/* Add the Homepage route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
