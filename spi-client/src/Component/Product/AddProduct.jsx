import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = () => {
  const [productImage, setProductImage] = useState('');
  const [productName, setProductName] = useState('');
  const [provider, setProvider] = useState('');
  const [providerEmail, setProviderEmail] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    const userData = JSON.parse(userDataString);
  
    const loggedDealer = userData?.user?.name; 
    const loggedEmail = userData?.user?.email;
  
    setProvider(loggedDealer);
    setProviderEmail(loggedEmail);
  }, []);

  const validateProductName = (value) => {
    if (!value.trim()) {
      return 'Product name is required';
    }
    return '';
  };

  const validatePrice = (value) => {
    if (!value.trim()) {
      return 'Price is required';
    }
    if (isNaN(value.trim())) {
      return 'Price must be a valid number';
    }
    if (value.trim().length > 4) {
      return 'Price must be up to 4 digits';
    }
    return '';
  };

  const validateStock = (value) => {
    if (!value.trim()) {
      return 'Stock is required';
    }
    if (isNaN(value.trim())) {
      return 'Stock must be a valid number';
    }
    if (value.trim().length > 4) {
      return 'Stock must be up to 4 digits';
    }
    return '';
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProductImage(imageUrl);
      setImageFile(file);
    }
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      productName: validateProductName(e.target.value),
    }));
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      price: validatePrice(e.target.value),
    }));
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      stock: validateStock(e.target.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error !== '')) {
      alert('Please fill out all required fields correctly');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('productImage', imageFile);
      formData.append('productName', productName);
      formData.append('provider', provider);
      formData.append('providerEmail', providerEmail);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('stock', stock);

      const response = await axios.post('http://localhost:5000/api/products/products', formData);

      console.log(response.data);
      alert('Product added successfully');

      setProductImage('');
      setProductName('');
      setPrice('');
      setDescription('');
      setStock('');
      setImageFile(null);
    } catch (error) {
      console.error(error);
      alert('An error occurred during product addition');
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label>Product Image:</label>
          {productImage && productImage !== '' && (
            <img src={productImage} alt="Product Preview" className="product-image" />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="form-group">
          <label>Product Name:</label>
          <input type="text" value={productName} onChange={handleProductNameChange} />
          {errors.productName && <span className="error">{errors.productName}</span>}
        </div>

        <div className="form-group">
          <label>Provider:</label>
          <input type="text" value={provider} disabled />
        </div>

        <div className="form-group">
          <label>Provider Email:</label>
          <input type="text" value={providerEmail} disabled />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input type="text" value={price} onChange={handlePriceChange} />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label>Stock:</label>
          <input type="text" value={stock} onChange={handleStockChange} />
          {errors.stock && <span className="error">{errors.stock}</span>}
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
