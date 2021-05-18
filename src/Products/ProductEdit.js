import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/css';

import {
  createProduct,
  retrieveProduct,
  updateProduct,
  deleteProduct,
} from './ProductsService';

const ProductEditStyles = css`
  color: #fff;
  background: #2a2c37;
  border-radius: 6px;
  padding: 15px;
  .ProductEdit {
    &-Input {
      width: 100%;
      border: 1px solid transparent;
      color: #fff;
      background: #1d1e26;
      padding: 10px 15px;
      margin-bottom: 5px;
      border-radius: 6px;
      outline: 0;
      &:focus {
        border-color: #50fa7b;
      }
    }
    &-Textarea {
      min-height: 80px;
      resize: none;
    }
    &-Button {
      border: 2px solid #50fa7b;
      color: #50fa7b;
      background: none;
      padding: 10px 15px;
      border-radius: 6px;
      outline: 0;
      cursor: pointer;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
`;

const ProductEdit = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!isEdit) {
      setForm({
        id: '',
        name: '',
        price: 0,
        description: '',
      });
      return;
    }

    (async () => {
      try {
        const product = await retrieveProduct(id);
        setForm(product);
      } catch (e) {
        console.warn(e);
        navigate(`/admin`, { replace: true });
      }
    })();
  }, [id]);

  const updateField = ({ name, value }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    try {
      const { id } = await createProduct(form);
      navigate(`/admin/${id}`);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(form);
      alert(`Updated ${form.name}`);
      navigate(`/admin`);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Really delete ${form.name}?`)) {
      return;
    }
    try {
      await deleteProduct(form.id);
      navigate(`/admin`);
    } catch (e) {
      console.warn(e);
    }
  };

  if (form === null) {
    return <div>Loading...</div>;
  }

  return (
    <form className={ProductEditStyles}>
      <input
        type="text"
        name="id"
        placeholder="ID"
        className="ProductEdit-Input"
        value={form.id}
        onChange={({ target }) => updateField(target)}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="ProductEdit-Input"
        value={form.name}
        onChange={({ target }) => updateField(target)}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        className="ProductEdit-Input"
        value={form.price}
        onChange={({ target }) =>
          updateField({ name: target.name, value: parseInt(target.value, 10) })
        }
      />
      <textarea
        name="description"
        placeholder="Description"
        className="ProductEdit-Input ProductEdit-Textarea"
        value={form.description}
        onChange={({ target }) => updateField(target)}
      />
      {!isEdit && (
        <button
          type="button"
          className="ProductEdit-Button"
          onClick={handleCreate}
        >
          Create
        </button>
      )}

      {isEdit && (
        <button
          type="button"
          className="ProductEdit-Button"
          onClick={handleUpdate}
        >
          Update
        </button>
      )}

      {isEdit && (
        <button
          type="button"
          className="ProductEdit-Button"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </form>
  );
};

export default ProductEdit;
