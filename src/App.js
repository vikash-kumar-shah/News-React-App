import './App.css';
import React from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
export default function App(){
    return (
      <>
      <Router>
      <div>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<News country="in" key="general" category="general" />} />
          <Route path="/entertainment" element={<News country="in" key="entertainment" category="entertainment" />} />
          <Route path="/business" element={<News country="in" key="business" category="business" />} />
          <Route path="/health" element={<News country="in" key="health" category="health" />} />
          <Route path="/science" element={<News country="in" key="science" category="science" />} />
          <Route path="/sports" element={<News country="in" key="sports" category="sports" />} />
          <Route path="/technology" element={<News country="in" key="technology" category="technology" />} />
        </Routes>
      </div>
      </Router>
      </>
    )
}


