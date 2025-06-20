import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Calendar, Tag, User } from 'lucide-react';
import { useBooks } from '../contexts/BookContext';
import { useAuth } from '../contexts/AuthContext';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, addToCart } = useBooks();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const book = books.find(b => b.id === id);

  if (!book) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-coffee-900 mb-4">Book not found</h2>
          <Link
            to="/books"
            className="bg-coffee-600 hover:bg-coffee-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(book);
    }
    // Show success message or navigate to cart
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const relatedBooks = books
    .filter(b => b.id !== book.id && b.genre === book.genre)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-coffee-600">
            <Link to="/" className="hover:text-coffee-800">Home</Link>
            <span>/</span>
            <Link to="/books" className="hover:text-coffee-800">Books</Link>
            <span>/</span>
            <span className="text-coffee-800 font-medium">{book.title}</span>
          </div>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center space-x-2 text-coffee-600 hover:text-coffee-800 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Book Image */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <img
                src={book.image}
                alt={book.title}
                className="w-full max-w-sm mx-auto rounded-lg shadow-md"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 flex items-center justify-center space-x-2 bg-coffee-100 hover:bg-coffee-200 text-coffee-800 py-3 rounded-lg transition-colors">
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 bg-coffee-100 hover:bg-coffee-200 text-coffee-800 py-3 rounded-lg transition-colors">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-serif font-bold text-coffee-900 mb-4">
                {book.title}
              </h1>
              <p className="text-xl text-coffee-600 mb-4">by {book.author}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center space-x-1">
                  {renderStars(book.rating)}
                </div>
                <span className="text-coffee-600">
                  {book.rating.toFixed(1)} out of 5
                </span>
                <span className="text-coffee-500">
                  (128 reviews)
                </span>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold text-coffee-800 mb-6">
                ${book.price.toFixed(2)}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <span className={`inline-block px-4 py-2 rounded-full font-medium ${
                  book.inStock
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {book.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </span>
              </div>

              {/* Quantity and Add to Cart */}
              {book.inStock && (
                <div className="flex items-center space-x-4 mb-8">
                  <div className="flex items-center space-x-2">
                    <label className="text-coffee-700 font-medium">Quantity:</label>
                    <div className="flex items-center border border-coffee-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-coffee-600 hover:text-coffee-800"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 border-x border-coffee-300">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-coffee-600 hover:text-coffee-800"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {isAuthenticated ? (
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-coffee-600 hover:bg-coffee-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Add to Cart</span>
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="flex-1 bg-coffee-600 hover:bg-coffee-700 text-white px-8 py-3 rounded-lg font-semibold text-center transition-colors"
                    >
                      Login to Purchase
                    </Link>
                  )}
                </div>
              )}

              {/* Book Metadata */}
              <div className="space-y-3 text-coffee-600">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5" />
                  <span>Published: {new Date(book.publicationDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Tag className="h-5 w-5" />
                  <span>Genre: {book.genre}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5" />
                  <span>Added by: {book.addedBy}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16">
          {/* Tab Headers */}
          <div className="border-b border-coffee-200">
            <nav className="flex space-x-8 px-8">
              {['description', 'details', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-coffee-600 text-coffee-600'
                      : 'border-transparent text-coffee-500 hover:text-coffee-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-xl font-semibold text-coffee-900 mb-4">Description</h3>
                <p className="text-coffee-700 leading-relaxed text-lg">
                  {book.description}
                </p>
              </div>
            )}

            {activeTab === 'details' && (
              <div>
                <h3 className="text-xl font-semibold text-coffee-900 mb-4">Book Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-coffee-800 mb-2">Basic Information</h4>
                    <dl className="space-y-2 text-coffee-600">
                      <div className="flex justify-between">
                        <dt>Title:</dt>
                        <dd>{book.title}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Author:</dt>
                        <dd>{book.author}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Genre:</dt>
                        <dd>{book.genre}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Publication Date:</dt>
                        <dd>{new Date(book.publicationDate).toLocaleDateString()}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h4 className="font-semibold text-coffee-800 mb-2">Additional Details</h4>
                    <dl className="space-y-2 text-coffee-600">
                      <div className="flex justify-between">
                        <dt>Price:</dt>
                        <dd>${book.price.toFixed(2)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Rating:</dt>
                        <dd>{book.rating.toFixed(1)}/5.0</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Availability:</dt>
                        <dd>{book.inStock ? 'In Stock' : 'Out of Stock'}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Added by:</dt>
                        <dd>{book.addedBy}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold text-coffee-900 mb-4">Customer Reviews</h3>
                <p className="text-coffee-600 mb-6">
                  Reviews feature coming soon. Be the first to leave a review for this book!
                </p>
                <button className="bg-coffee-600 hover:bg-coffee-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Write a Review
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-coffee-900 mb-8">
              More from {book.genre}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedBooks.map((relatedBook) => (
                <Link
                  key={relatedBook.id}
                  to={`/books/${relatedBook.id}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
                >
                  <img
                    src={relatedBook.image}
                    alt={relatedBook.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-coffee-900 mb-2 line-clamp-2">
                      {relatedBook.title}
                    </h3>
                    <p className="text-coffee-600 text-sm mb-2">{relatedBook.author}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-coffee-800">
                        ${relatedBook.price.toFixed(2)}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-coffee-600">
                          {relatedBook.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;