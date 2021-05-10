import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    &-Button {
      border: 2px solid #50fa7b;
      color: #50fa7b;
      background: none;
      padding: 10px 15px;
      margin-right: 5px;
      border-radius: 6px;
      outline: 0;
      cursor: pointer;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
`;

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const product = await retrieveProduct(id);
        setProduct(product);
      } catch (e) {
        console.warn(e);
        navigate('/', { replace: true, state: { id } });
      }
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
        <button
          type="button"
          className="Product-Button"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Product;
