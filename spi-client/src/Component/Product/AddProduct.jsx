import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [productImage, setProductImage] = useState('');
  const [productName, setProductName] = useState('');
  const [provider, setProvider] = useState('');
  const [providerEmail, setProviderEmail] = useState(''); // Added providerEmail state
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // Fetch the logged dealer and email from local storage
    const userDataString = localStorage.getItem('user');
    const userData = JSON.parse(userDataString);
  
    const loggedDealer = userData?.user?.name; // Assuming username is the dealer
    const loggedEmail = userData?.user?.email;
  
    console.log('Logged Dealer:', loggedDealer);
    console.log('Logged Email:', loggedEmail);
  
    setProvider(loggedDealer);
    setProviderEmail(loggedEmail);
  }, []);
  
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
      formData.append('providerEmail', providerEmail); // Added providerEmail to the form data
      formData.append('price', price);
      formData.append('description', description);
      formData.append('stock', stock);

      const response = await axios.post('http://localhost:5000/api/products/products', formData);

      console.log(response.data);
      alert('Product added successfully');

      setProductImage('');
      setProductName('');
      setProvider('');
      setProviderEmail('');
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

        {/* The following two labels are added for provider and provider email */}
        <label>
          Provider:
          <input type="text" value={provider} disabled />
        </label>

        <label>
          Provider Email:
          <input type="text" value={providerEmail} disabled />
        </label>

        <label>
          Price:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>

        <label>
          Stock:
          <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} />
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
