import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProductsIndex from '../Products/ProductsIndex';

const Admin = () => (
  <div>
    <h1>Admin</h1>
    <Routes>
      <Route path="/" element={<ProductsIndex />} />
    </Routes>
  </div>
);

export default Admin;
