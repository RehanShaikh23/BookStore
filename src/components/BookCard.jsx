import React from 'react';
import { Star, ShoppingCart, Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../contexts/BookContext';

const BookCard = ({ book, showActions = false, onEdit, onDelete }) => {
  const { isAuthenticated, user } = useAuth();
  const { addToCart } = useBooks();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(book);
  };

  const canManage = isAuthenticated && (user?.id === book.addedBy || user?.username === 'admin');

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover Actions */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
          <Link
            to={`/books/${book.id}`}
            className="flex-1 bg-white/90 hover:bg-white text-coffee-800 px-3 py-2 rounded-lg font-medium text-sm flex items-center justify-center space-x-1 transition-colors"
          >
            <Eye className="h-4 w-4" />
            <span>View</span>
          </Link>
          
          {isAuthenticated && (
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-coffee-600/90 hover:bg-coffee-600 text-white px-3 py-2 rounded-lg font-medium text-sm flex items-center justify-center space-x-1 transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add</span>
            </button>
          )}
        </div>

        {/* Management Actions for Owner */}
        {showActions && canManage && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
            <button
              onClick={() => onEdit(book)}
              className="p-2 bg-blue-600/90 hover:bg-blue-600 text-white rounded-full transition-colors"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(book.id)}
              className="p-2 bg-red-600/90 hover:bg-red-600 text-white rounded-full transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Stock Status */}
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            book.inStock
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {book.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2">
          <Link
            to={`/books/${book.id}`}
            className="text-lg font-serif font-semibold text-coffee-900 hover:text-coffee-700 transition-colors line-clamp-2"
          >
            {book.title}
          </Link>
        </div>

        <p className="text-coffee-600 text-sm mb-3">{book.author}</p>

        <div className="flex items-center space-x-1 mb-3">
          {renderStars(book.rating)}
          <span className="text-sm text-coffee-500 ml-2">
            ({book.rating.toFixed(1)})
          </span>
        </div>

        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-coffee-100 text-coffee-800 text-xs rounded-full">
            {book.genre}
          </span>
        </div>

        <p className="text-coffee-600 text-sm mb-4 line-clamp-3">
          {book.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-coffee-800">
            ${book.price.toFixed(2)}
          </span>
          
          {isAuthenticated ? (
            <button
              onClick={handleAddToCart}
              className="bg-coffee-600 hover:bg-coffee-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-coffee-600 hover:bg-coffee-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Login to Buy
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;