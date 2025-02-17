import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Note from './components/Note';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Note />} />  {/* Ensure this has an element */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
