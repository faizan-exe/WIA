import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import JobCard from '../../components/JobCard';

const Jobs = () => {
  const [products] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/100',
      productName: 'Wireless Bluetooth Headphones',
      productDescription:
        'High-quality wireless Bluetooth headphones with noise cancellation and 20-hour battery life.',
      price: '$99.99',
      category: 'Electronics',
      stockQuantity: '50 units available',
      sku: 'WBH123',
      tags: 'Wireless, Bluetooth, Noise Cancellation',
      organizationName: 'AudioTech Inc.',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/100',
      productName: 'Smart Fitness Watch',
      productDescription:
        'Track your fitness goals with this smart watch featuring heart rate monitoring, GPS, and waterproof design.',
      price: '$149.99',
      category: 'Wearables',
      stockQuantity: '100 units available',
      sku: 'SFW456',
      tags: 'Fitness, Smartwatch, GPS',
      organizationName: 'HealthGear Ltd.',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/100',
      productName: 'Ergonomic Office Chair',
      productDescription:
        'Stay comfortable while working with this ergonomic chair, designed to reduce back strain.',
      price: '$199.99',
      category: 'Furniture',
      stockQuantity: '30 units available',
      sku: 'EOC789',
      tags: 'Ergonomic, Office, Furniture',
      organizationName: 'ComfortWorks',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/100',
      productName: '4K Ultra HD TV',
      productDescription:
        'Experience stunning visuals with this 55-inch 4K Ultra HD TV, complete with HDR support and smart features.',
      price: '$499.99',
      category: 'Electronics',
      stockQuantity: '20 units available',
      sku: '4KTV101',
      tags: '4K, HDR, Smart TV',
      organizationName: 'VisionTech',
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/100',
      productName: 'Premium Coffee Maker',
      productDescription:
        'Brew your favorite coffee with this premium coffee maker, featuring a built-in grinder and milk frother.',
      price: '$249.99',
      category: 'Home Appliances',
      stockQuantity: '25 units available',
      sku: 'PCM202',
      tags: 'Coffee Maker, Grinder, Frother',
      organizationName: 'BrewMaster Co.',
    },
  ]);

  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle adding items to cart
  const addToCart = (product) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex((item) => item.id === product.id);

    if (productIndex > -1) {
      // If the product is already in the cart, increase the quantity
      updatedCart[productIndex].quantity += 1;
    } else {
      // Otherwise, add the product with quantity 1
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Function to handle removing items from cart
  const removeFromCart = (productId) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === productId && item.quantity > 1) {
          // Decrease quantity if more than 1
          return { ...item, quantity: item.quantity - 1 };
        }
        // If quantity is 1, remove the item entirely
        return null;
      })
      .filter((item) => item !== null); // Filter out the null values (items removed)
  
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Calculate total price
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  // Calculate the total number of items in the cart (based on quantity)
  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      <Header userRole={'job-seeker'} />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="relative">
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
                  <li key={item.id} className="flex justify-between items-center">
                    <span>
                      {item.productName} {item.quantity > 1 && `x${item.quantity}`}
                    </span>
                    <span>{item.price}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
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
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ml-2">
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
