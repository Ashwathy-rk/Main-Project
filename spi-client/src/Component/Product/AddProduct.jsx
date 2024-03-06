// AddProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [productImage, setProductImage] = useState('');
  const [productName, setProductName] = useState('');
  const [provider, setProvider] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProductImage(imageUrl);
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('productImage', imageFile);
      formData.append('productName', productName);
      formData.append('provider', provider);
      formData.append('price', price);
      formData.append('description', description);

      const response = await axios.post('http://localhost:5000/api/products/products', formData);

      console.log(response.data);
      alert('Product added successfully');

      setProductImage('');
      setProductName('');
      setProvider('');
      setPrice('');
      setDescription('');

      setImageFile(null);
    } catch (error) {
      console.error(error);
      alert('An error occurred during product addition');
    }
  };

  return (
    <div>
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product Image:
          <br />
          {productImage && productImage !== '' && (
            <img src={productImage} alt="Product Preview" style={{ maxWidth: '100%', borderRadius: '4px' }} />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <label>
          Product Name:
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </label>

        <label>
          Provider:
          <input type="text" value={provider} onChange={(e) => setProvider(e.target.value)} />
        </label>

        <label>
          Price:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>

        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
