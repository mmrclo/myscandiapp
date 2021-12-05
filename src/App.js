import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = React.lazy(() => import('./components/home'));
const AddProduct = lazy(() => import('./components/productItem'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/addproduct" element={<AddProduct />}/>
      </Routes>
    </Suspense>
  </Router>
);

export default App;