import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { css } from '@emotion/css';

import ProductCard from './ProductCard';

import { listProducts } from './ProductsService';

const ProductsIndexStyles = css`
  .ProductsIndex {
    &-List {
      margin-top: 10px;
    }
    &-Radios {
      display: flex;
      align-items: center;
      span {
        width: 35px;
        color: #fff;
        font-size: 0.8rem;
        margin-right: 10px;
      }
      label {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }
`;

const ProductsIndex = () => {
  const { state } = useLocation();
  const [products, setProducts] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (state) {
      console.warn(`Nothing found for ${state.id}`);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const data = await listProducts();
      const params = Object.fromEntries([...searchParams]);
      sortProductsFromParams(data, params);
    })();
  }, []);

  const sortProductsFromParams = (data, params) => {
    if (!Object.keys(params).length) {
      setProducts(data);
      return;
    }

    const sorted = [...data].sort((x, y) => {
      const { sort, order } = params;
      switch (order) {
        case 'ascending': {
          return x[sort] > y[sort] ? 1 : -1;
        }
        case 'descending': {
          return x[sort] < y[sort] ? 1 : -1;
        }
        default: {
          return 0;
        }
      }
    });
    setProducts(sorted);
  };

  const updateParams = (e) => {
    const { name, value } = e.target;
    const currentParams = Object.fromEntries([...searchParams]);
    const newParams = { ...currentParams, [name]: value };
    setSearchParams(newParams);
    sortProductsFromParams(products, newParams);
  };

  if (products === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={ProductsIndexStyles}>
      <div className="ProductsIndex-Radios">
        <span>Sort:</span>
        <label>
          Name
          <input
            type="radio"
            name="sort"
            value="name"
            onChange={updateParams}
            defaultChecked={searchParams.get('sort') === 'name'}
          />
        </label>
        <label>
          Price
          <input
            type="radio"
            name="sort"
            value="price"
            onChange={updateParams}
            defaultChecked={searchParams.get('sort') === 'price'}
          />
        </label>
      </div>
      <div className="ProductsIndex-Radios">
        <span>Order:</span>
        <label>
          Ascending
          <input
            type="radio"
            name="order"
            value="ascending"
            onChange={updateParams}
            defaultChecked={searchParams.get('order') === 'ascending'}
          />
        </label>
        <label>
          Descending
          <input
            type="radio"
            name="order"
            value="descending"
            onChange={updateParams}
            defaultChecked={searchParams.get('order') === 'descending'}
          />
        </label>
      </div>
      <div className="ProductsIndex-List">
        {products.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductsIndex;
