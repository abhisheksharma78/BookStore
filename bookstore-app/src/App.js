import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from "react";
import Login from './components/Login';
import Register from './components/Register';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BookDetail from './components/BookDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/books" element={<BookList/>} />
            <Route path="/add-book" element={<AddBook/>} />
            <Route path="/book/:id" element={<BookDetail/>} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
