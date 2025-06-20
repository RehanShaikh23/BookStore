import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useBooks } from '../contexts/BookContext';
import { useAuth } from '../contexts/AuthContext';

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, getCartTotal, clearCart } = useBooks();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (bookId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(bookId);
    } else {
      updateCartQuantity(bookId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }
    // Implement checkout logic
    alert('Checkout functionality would be implemented here!');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-coffee-300 mb-8" />
            <h2 className="text-3xl font-serif font-bold text-coffee-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-xl text-coffee-600 mb-8">
              Discover amazing books and add them to your cart to get started.
            </p>
            <Link
              to="/books"
              className="inline-flex items-center space-x-2 bg-coffee-600 hover:bg-coffee-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              <span>Browse Books</span>
              <ArrowLeft className="h-5 w-5 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-coffee-900 mb-4">
            Shopping Cart
          </h1>
          <p className="text-coffee-600">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="flex p-6">
                  {/* Book Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-32 object-cover rounded-lg"
                    />
                  </div>

                  {/* Book Details */}
                  <div className="ml-6 flex-1">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/books/${item.id}`}
                          className="text-lg font-serif font-semibold text-coffee-900 hover:text-coffee-700 transition-colors"
                        >
                          {item.title}
                        </Link>
                        <p className="text-coffee-600 mt-1">{item.author}</p>
                        <div className="mt-2">
                          <span className="inline-block px-3 py-1 bg-coffee-100 text-coffee-800 text-xs rounded-full">
                            {item.genre}
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 p-2 text-coffee-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Remove from cart"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Quantity and Price */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-coffee-700 font-medium">Quantity:</span>
                        <div className="flex items-center border border-coffee-300 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-2 text-coffee-600 hover:text-coffee-800 hover:bg-coffee-50 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 border-x border-coffee-300 min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-2 text-coffee-600 hover:text-coffee-800 hover:bg-coffee-50 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-coffee-500 text-sm">
                          ${item.price.toFixed(2)} each
                        </div>
                        <div className="text-xl font-bold text-coffee-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <div className="text-right">
              <button
                onClick={clearCart}
                className="text-coffee-600 hover:text-red-600 font-medium transition-colors"
              >
                Clear all items
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h3 className="text-xl font-serif font-semibold text-coffee-900 mb-6">
                Order Summary
              </h3>

              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-coffee-600">
                    Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>
                  <span className="font-medium text-coffee-800">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between">
                  <span className="text-coffee-600">Shipping</span>
                  <span className="font-medium text-green-600">
                    {getCartTotal() >= 25 ? 'FREE' : '$4.99'}
                  </span>
                </div>

                {/* Tax */}
                <div className="flex justify-between">
                  <span className="text-coffee-600">Tax</span>
                  <span className="font-medium text-coffee-800">
                    ${(getCartTotal() * 0.08).toFixed(2)}
                  </span>
                </div>

                <hr className="border-coffee-200" />

                {/* Total */}
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-coffee-900">Total</span>
                  <span className="text-coffee-900">
                    ${(getCartTotal() + (getCartTotal() >= 25 ? 0 : 4.99) + getCartTotal() * 0.08).toFixed(2)}
                  </span>
                </div>

                {/* Free Shipping Message */}
                {getCartTotal() < 25 && (
                  <div className="bg-coffee-50 border border-coffee-200 rounded-lg p-3">
                    <p className="text-sm text-coffee-700">
                      Add ${(25 - getCartTotal()).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-coffee-600 hover:bg-coffee-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Proceed to Checkout</span>
              </button>

              {/* Continue Shopping */}
              <Link
                to="/books"
                className="block w-full mt-4 bg-coffee-100 hover:bg-coffee-200 text-coffee-800 py-3 px-6 rounded-lg font-medium text-center transition-colors"
              >
                Continue Shopping
              </Link>

              {/* Security Notice */}
              <div className="mt-6 text-center">
                <p className="text-xs text-coffee-500">
                  🔒 Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;