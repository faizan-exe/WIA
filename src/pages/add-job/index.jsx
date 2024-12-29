import React, { useState } from 'react';
import Header from '../../components/Header';
import { useMutation } from '@tanstack/react-query';
import { createProduct } from '../../Repository/productRepo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddJob() {
  const navigation = useNavigate();
  const [productData, setProductData] = useState({
    jobName: '',  // Prefilled field
    jobDescription: '',  // Prefilled field
    price: '',  // Prefilled field
    stockQuantity: '',  // Prefilled field
    category: '',  // Prefilled field
    sku: (Math.random() * 90000000 + 10000000).toFixed(0).toString(),
    tags: '',  // Prefilled field
    discount: '',  // Prefilled field
    launchDate: '',  // Prefilled field
    warrantyInfo: '',  // Prefilled field
    image: null,  // Initially no image
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const { mutate, isPending, isError,} = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      console.log('Product added successfully!', data);
      alert('Product added successfully!');
     navigation('/org-jobs')
    },
    onError: (err) => {
      console.error('Error:', err);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload the image to ImgBB if an image is selected
    let imageUrl = null;
    if (productData.image) {
      const formData = new FormData();
      formData.append('image', productData.image);
      const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        params: {
          key: '5789a9111a607fd180aa3981f47e7c36', // Add your ImgBB API key here
        },
      });

      if (response.data.success) {
        imageUrl = response.data.data.url;  // Get the URL of the uploaded image
      } else {
        console.error('Error uploading image');
        return;
      }
    }

    // Prepare the job data
    const jobData = {
      title: productData.jobName,
      description: productData.jobDescription,
      price: parseFloat(productData.price),
      stockQuantity: parseInt(productData.stockQuantity, 10),
      category: productData.category,
      sku: productData.sku,
      tags: productData.tags.split(',').map(tag => tag.trim()),
      discount: productData.discount ? parseFloat(productData.discount) : undefined,
      launchDate: productData.launchDate ? new Date(productData.launchDate) : undefined,
      warrantyInfo: productData.warrantyInfo,
      image: imageUrl,  // Send the image URL to the backend
    };

    // Call the mutate function from React Query to trigger the API request
    mutate(jobData);
  };

  return (
    <>
      <Header userRole={'org'} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Product</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {productData.image && (
                <img
                  src={URL.createObjectURL(productData.image)}
                  alt="Job Preview"
                  className="mt-4 w-32 h-32 object-cover rounded"
                />
              )}
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="jobName"
                value={productData.jobName}
                onChange={handleInputChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Product Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Description</label>
              <textarea
                name="jobDescription"
                value={productData.jobDescription}
                onChange={handleInputChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter product description"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <div className="mt-2 space-y-2">
                {['Skincare', 'Healthcare', 'Gaming', 'Furniture'].map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={productData.category === category}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <span className="text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter product price"
                required
              />
            </div>

            {/* Stock Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
              <input
                type="number"
                name="stockQuantity"
                value={productData.stockQuantity}
                onChange={handleInputChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter stock quantity"
                required
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-medium text-gray-700">SKU</label>
              <input
                type="text"
                name="sku"
                value={productData.sku}
                readOnly
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>


            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Tags</label>
              <input
                type="text"
                name="tags"
                value={productData.tags}
                onChange={handleInputChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter tags (comma-separated)"
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Discount</label>
              <input
                type="number"
                name="discount"
                value={productData.discount}
                onChange={handleInputChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter discount percentage"
              />
            </div>

            {/* Launch Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Launch Date</label>
              <input
                type="date"
                name="launchDate"
                value={productData.launchDate}
                onChange={handleInputChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Warranty Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Warranty Information</label>
              <textarea
                name="warrantyInfo"
                value={productData.warrantyInfo}
                onChange={handleInputChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter warranty information"
                rows="3"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isPending? "Adding Product": 'Add Product'}
              </button>
            </div>
            {isError && <p className="text-red-600">{"Something went wrong !"}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default AddJob;
