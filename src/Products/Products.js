import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { css } from '@emotion/css';

// import Product from './Product';
// import ProductsIndex from './ProductsIndex';
import Loadable from '../Common/Loadable';

const Product = Loadable(lazy(() => import('./Product')));
const ProductsIndex = Loadable(lazy(() => import('./ProductsIndex')));

const ProductsStyles = css`
  display: flex;
  flex-direction: column;
  .Logo {
    width: 125px;
    margin: 0 auto 25px;
  }
`;

const Products = () => (
  <div className={ProductsStyles}>
    <img src="/assets/img/logo.svg" alt="Ultimate Burgers" className="Logo" />
    <Routes>
      <Route path="/" element={<ProductsIndex />} />
      <Route path=":id" element={<Product />} />
    </Routes>
  </div>
);

export default Products;
