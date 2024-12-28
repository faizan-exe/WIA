import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JobCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  console.log(product);
  

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      {/* Main Info */}
      <div className="flex items-center space-x-4">
        {product.image && (
          <img
            src={product.image}
            alt={product.productName}
            className="w-16 h-16 rounded object-cover"
          />
        )}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
          <p className="text-gray-600 text-sm">Price: {product.price}</p>
        </div>
      </div>

      {/* View Details Button */}
      <button
        onClick={handleModalToggle}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none"
      >
        View Details
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto"
          onClick={handleModalToggle}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Product Details</h3>
              <button
                onClick={handleModalToggle}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-gray-700">Product Name</h4>
                <p className="text-gray-600">{product.title}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">Product Description</h4>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">Price</h4>
                <p className="text-gray-600">{product.price}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">Category</h4>
                <p className="text-gray-600">{product.category}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">Stock Quantity</h4>
                <p className="text-gray-600">{product.stockQuantity}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">SKU</h4>
                <p className="text-gray-600">{product.sku}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">Tags</h4>
                <p className="text-gray-600">{
                  product.tags.map((tag) => (
                    <span key={tag} className="mr-2 inline-block bg-gray-200 rounded-full px-2 py-1 text-sm mb-2">
                      {tag}
                    </span>
                  ))
                  }</p>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 text-right">
              <button
                onClick={handleModalToggle}
                className="px-4 py-2 bg-gray-300 rounded-md text-gray-800 hover:bg-gray-400 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobCard;
