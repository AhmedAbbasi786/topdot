import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProductList from './components/product/ProductList';
import ProductDetail from './components/product/ProductDetail';
import NotFound from './pages/Notfound';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path='/product-detail/:listingId' element={<ProductDetail />} />
        {/* Catch-all route for "Not Found" page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
