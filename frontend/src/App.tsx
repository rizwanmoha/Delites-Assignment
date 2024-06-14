import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './Component/SignIn';
import SignUp from './Component/SignUp';
import HomePage from './Pages/HomePage';
import Header from './Component/Header';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
      
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
