import React, { useState } from 'react';
import Header from '../../components/Header';
import JobCard from '../../components/JobCard'

function OrgJobs() {
  const [productPosts, setProductPosts] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/100',
      productName: 'Skincare Lotion',
      productDescription: 'A nourishing lotion for healthy and radiant skin.',
      price: '$25',
      category: 'Skincare',
      stockQuantity: 50,
      sku: 'SKN12345',
      tags: 'hydration, skincare',
      organizationName: 'Beauty Essentials Co.',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/100',
      productName: 'Wireless Headphones',
      productDescription: 'High-quality wireless headphones with noise cancellation.',
      price: '$150',
      category: 'Electronics',
      stockQuantity: 200,
      sku: 'ELEC98765',
      tags: 'audio, wireless',
      organizationName: 'TechWave Inc.',
    },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setCurrentProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    setProductPosts((prev) =>
      prev.map((product) =>
        product.id === currentProduct.id ? { ...currentProduct } : product
      )
    );
    handleModalClose();
  };

  return (
    <>
      <Header userRole={'organization'} />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Product Listings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productPosts.map((product) => (
            <div key={product.id} className="relative">
              {/* ProductCard Component */}
              <JobCard product={product} />

              {/* Buttons Container */}
              <div className="bg-white p-2 flex justify-around space-x-2 rounded-lg shadow-md mt-0">
                <button
                  onClick={() => handleEditClick(product)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Edit
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && currentProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleModalClose}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Product Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={currentProduct.productName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Product Description</label>
                <textarea
                  name="productDescription"
                  value={currentProduct.productDescription}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                ></textarea>
              </div>

              <div>
                <label className="block font-medium text-gray-700">Price</label>
                <input
                  type="text"
                  name="price"
                  value={currentProduct.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={currentProduct.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Stock Quantity</label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={currentProduct.stockQuantity}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={currentProduct.sku}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={currentProduct.tags}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrgJobs;
