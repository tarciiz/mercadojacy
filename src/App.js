import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
// import SearchPage from './pages/SearchPage/SearchPage';
// import ProductPage from './pages/ProductPage/ProductPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mercadojacy" element={<HomePage />} />
        {/* <Route path="/search" element={<SearchPage />} />
        <Route path="/product" element={<ProductPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;