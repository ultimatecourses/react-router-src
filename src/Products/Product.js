import React from 'react';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Product</div>;
};

export default Product;
