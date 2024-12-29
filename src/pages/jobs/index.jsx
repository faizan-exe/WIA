import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import JobCard from '../../components/JobCard';
import { getAllProducts } from '../../Repository/productRepo';
import { useQuery } from '@tanstack/react-query';
const Jobs = () => {
  const {
    data: products,
    error,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle adding items to cart
  const addToCart = (product) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex((item) => item._id === product._id);

    if (productIndex > -1) {
      updatedCart[productIndex].quantity += 1;
    } else {
      updatedCart.push({
        ...product,
        quantity: 1,
        price: typeof product.price === "string"
          ? parseFloat(product.price.replace("$", ""))
          : product.price,
      });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Function to handle removing items from cart
  const removeFromCart = (productId) => {
    const updatedCart = cart
      .map((item) => {
        if (item._id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item._id === productId ? null : item;
      })
      .filter((item) => item !== null);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Load cart from localStorage on page load
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Calculate total price
  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => {
        const price = typeof item.price === "string"
          ? parseFloat(item.price.replace("$", ""))
          : item.price;
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  // Calculate total number of items in cart
  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header userRole={"woman"} />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="relative">
              <JobCard product={product} />
              <button
                onClick={() => addToCart(product)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Cart Button */}
        <div className="flex justify-center w-screen fixed bottom-3">
          <button
            onClick={openModal}
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
          >
            View Cart ({calculateTotalItems()})
          </button>
        </div>
      </div>

      {/* Cart Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <ul className="space-y-4">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <li key={item._id} className="flex justify-between items-center">
                    <span>
                      {item.title} {item.quantity > 1 && `x${item.quantity}`}
                    </span>
                    <span>${item.price}</span>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))
              ) : (
                <p>Your cart is empty!</p>
              )}
            </ul>
            <div className="flex justify-between mt-4">
              <span className="text-xl font-bold">Total: ${calculateTotalPrice()}</span>
              <div>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ml-2" onClick={() => {
                  closeModal();
                  setTimeout(() => {
                    alert("Checkout successful and your total is: $" + calculateTotalPrice());
                  }, 100); // Slight delay to allow modal to close
                  setCart([]);
                }}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Jobs;
