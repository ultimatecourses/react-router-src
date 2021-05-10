import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/css';

import { retrieveProduct } from './ProductsService';

const ProductStyles = css`
  color: #fff;
  background: #2a2c37;
  border-radius: 6px;
  padding: 15px;
  .Product {
    &-Title {
      display: flex;
    }
    &-Name {
      font-weight: 600;
      font-size: 1.2rem;
      margin: 0;
    }
    &-Price {
      color: #50fa7b;
      font-weight: 600;
      font-size: 1rem;
      margin: 0;
    }
    &-Icon {
      width: 50px;
      margin-right: 15px;
    }
  }
`;

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const product = await retrieveProduct(id);
      setProduct(product);
    })();
  }, [id]);

  if (product === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={ProductStyles}>
      <div className="Product-Title">
        <img
          src={`/assets/img/products/${product.id}.svg`}
          alt={product.name}
          className="Product-Icon"
        />
        <div>
          <h1 className="Product-Name">{product.name}</h1>
          <p className="Product-Price">{`$${product.price / 100}`}</p>
        </div>
      </div>
      <div className="Product-Description">
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default Product;
