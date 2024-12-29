import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import JobCard from '../../components/JobCard';
import axios from 'axios';
import { deleteProduct, editProduct } from '../../Repository/productRepo';

function OrgJobs() {
  const [productPosts, setProductPosts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

    // Fetch jobs function
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/jobs/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProductPosts(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    const handleEditProduct = async (product) => {
      try {
        const response = await editProduct(product);
        console.log('Job edited:', response);
        await fetchJobs();
      } catch (error) {
        console.error('Error editing job:', error);
      }
    };
  
    // Fetch jobs on component mount
    useEffect(() => {
      fetchJobs();
    }, []);
  

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

  const handleDelete = async (id) => {
    try {
      const reponse = await deleteProduct(id);
      console.log('Job deleted:', reponse);
      await fetchJobs();
    }
    catch (error) {
      console.error('Error deleting job:', error);
    }
  }
  const handleSaveChanges = async () => {
    const updatedProduct = {
      ...currentProduct,
      tags: Array.isArray(currentProduct.tags)
        ? currentProduct.tags.join(', ') // Join array to a comma-separated string
        : currentProduct.tags, // If it's already a string, use it as is
    };
  console.log('Updated Product:', updatedProduct);
    try {
      await handleEditProduct(updatedProduct); // Make API call
      setProductPosts((prev) =>
        prev.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
      handleModalClose();
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };
  
  

  return (
    <>
      <Header userRole={'org'} />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Product Listings</h1>
          {
            productPosts.length === 0 && <p>No Jobs Posted Yet</p>
          }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productPosts.map((product) => (
            <div key={product._id} className="relative">
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
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none" onClick={() => handleDelete(product._id)}>
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
                  name="title"
                  value={currentProduct.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Product Description</label>
                <textarea
                  name="description"
                  value={currentProduct.description}
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
                  readOnly
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
