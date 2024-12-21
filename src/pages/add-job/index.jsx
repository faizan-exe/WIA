import React, { useState } from 'react';
import Header from '../../components/Header';

function AddJob() {
  const [productData, setProductData] = useState({
    jobName: '',
    jobDescription: '',
    price: '',
    stockQuantity: '',
    category: '',
    sku: '',
    tags: '',
    discount: '',
    launchDate: '',
    warrantyInfo: '',
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProductData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job Data Submitted:', productData);
    // Add logic to send productData to backend or API
    alert('Job added successfully!');
  };

  return (
    <>
      <Header userRole={'organization'} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Product</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Image */}
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
                  src={productData.image}
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

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <div className="mt-2 space-y-2">
                {['Skincare', 'Healthcare', 'Gaming', 'Furniture'].map((industry) => (
                  <label key={industry} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="category"
                      value={industry}
                      checked={productData.industry === industry}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <span className="text-gray-700">{industry}</span>
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
                onChange={handleInputChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter SKU"
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
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddJob;
