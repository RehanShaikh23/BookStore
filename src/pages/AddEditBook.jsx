import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, AlertCircle, CheckCircle, Upload } from 'lucide-react';
import { useBooks } from '../contexts/BookContext';
import { useAuth } from '../contexts/AuthContext';

const AddEditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, addBook, updateBook } = useBooks();
  const { user } = useAuth();
  
  const isEditing = Boolean(id);
  const existingBook = isEditing ? books.find(book => book.id === id) : null;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publicationDate: '',
    genre: '',
    description: '',
    price: '',
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg'
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (isEditing && existingBook) {
      setFormData({
        title: existingBook.title,
        author: existingBook.author,
        publicationDate: existingBook.publicationDate,
        genre: existingBook.genre,
        description: existingBook.description,
        price: existingBook.price.toString(),
        image: existingBook.image
      });
    }
  }, [isEditing, existingBook]);

  const genres = [
    'Fiction',
    'Non-Fiction',
    'Mystery',
    'Romance',
    'Science Fiction',
    'Fantasy',
    'Thriller',
    'Biography',
    'History',
    'Self-Help',
    'Business',
    'Technology',
    'Health',
    'Travel',
    'Poetry',
    'Drama',
    'Comedy',
    'Adventure',
    'Classic Literature',
    'Contemporary Fiction',
    'Historical Fiction',
    'Young Adult',
    'Children\'s Books',
    'Horror',
    'Crime',
    'Philosophy',
    'Religion',
    'Art',
    'Music',
    'Sports',
    'Cooking',
    'Crafts',
    'Gardening',
    'Parenting',
    'Education',
    'Reference'
  ];

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.length < 2) {
      errors.title = 'Title must be at least 2 characters long';
    }

    if (!formData.author.trim()) {
      errors.author = 'Author is required';
    } else if (formData.author.length < 2) {
      errors.author = 'Author must be at least 2 characters long';
    }

    if (!formData.publicationDate) {
      errors.publicationDate = 'Publication date is required';
    } else {
      const date = new Date(formData.publicationDate);
      const now = new Date();
      if (date > now) {
        errors.publicationDate = 'Publication date cannot be in the future';
      }
    }

    if (!formData.genre) {
      errors.genre = 'Genre is required';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      errors.description = 'Description must be at least 10 characters long';
    } else if (formData.description.length > 1000) {
      errors.description = 'Description must be less than 1000  characters';
    }

    if (!formData.price) {
      errors.price = 'Price is required';
    } else {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        errors.price = 'Price must be a positive number';
      } else if (price > 999.99) {
        errors.price = 'Price must be less than $1000';
      }
    }

    if (!formData.image.trim()) {
      errors.image = 'Image URL is required';
    } else if (!isValidUrl(formData.image)) {
      errors.image = 'Please enter a valid URL';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const bookData = {
        ...formData,
        price: parseFloat(formData.price),
        addedBy: user?.id || user?.username || 'anonymous'
      };

      if (isEditing) {
        updateBook({ ...bookData, id: existingBook.id });
      } else {
        addBook(bookData);
      }

      setSubmitSuccess(true);
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/my-books');
      }, 1500);

    } catch (error) {
      console.error('Error saving book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-coffee-900 mb-2">
            {isEditing ? 'Book Updated!' : 'Book Added!'}
          </h2>
          <p className="text-coffee-600 mb-4">
            {isEditing 
              ? 'Your book has been successfully updated.'
              : 'Your book has been successfully added to the collection.'
            }
          </p>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-coffee-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center space-x-2 text-coffee-600 hover:text-coffee-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          
          <h1 className="text-4xl font-serif font-bold text-coffee-900 mb-4">
            {isEditing ? 'Edit Book' : 'Add New Book'}
          </h1>
          <p className="text-coffee-600">
            {isEditing 
              ? 'Update the book information below.'
              : 'Fill in the details to add a new book to your collection.'
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-coffee-700 mb-2">
                Book Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-colors ${
                  validationErrors.title
                    ? 'border-red-300 focus:border-red-300 focus:ring-red-500'
                    : 'border-coffee-300 focus:border-coffee-500'
                }`}
                placeholder="Enter the book title"
              />
              {validationErrors.title && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{validationErrors.title}</span>
                </p>
              )}
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-coffee-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-colors ${
                  validationErrors.author
                    ? 'border-red-300 focus:border-red-300 focus:ring-red-500'
                    : 'border-coffee-300 focus:border-coffee-500'
                }`}
                placeholder="Enter the author's name"
              />
              {validationErrors.author && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{validationErrors.author}</span>
                </p>
              )}
            </div>

            {/* Publication Date and Genre Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="publicationDate" className="block text-sm font-medium text-coffee-700 mb-2">
                  Publication Date *
                </label>
                <input
                  type="date"
                  id="publicationDate"
                  name="publicationDate"
                  value={formData.publicationDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-colors ${
                    validationErrors.publicationDate
                      ? 'border-red-300 focus:border-red-300 focus:ring-red-500'
                      : 'border-coffee-300 focus:border-coffee-500'
                  }`}
                />
                {validationErrors.publicationDate && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{validationErrors.publicationDate}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-coffee-700 mb-2">
                  Genre *
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-colors ${
                    validationErrors.genre
                      ? 'border-red-300 focus:border-red-300 focus:ring-red-500'
                      : 'border-coffee-300 focus:border-coffee-500'
                  }`}
                >
                  <option value="">Select a genre</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                {validationErrors.genre && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{validationErrors.genre}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-coffee-700 mb-2">
                Price (USD) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-coffee-500">$</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  max="999.99"
                  className={`w-full pl-8 pr-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-colors ${
                    validationErrors.price
                      ? 'border-red-300 focus:border-red-300 focus:ring-red-500'
                      : 'border-coffee-300 focus:border-coffee-500'
                  }`}
                  placeholder="0.00"
                />
              </div>
              {validationErrors.price && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{validationErrors.price}</span>
                </p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-coffee-700 mb-2">
                Book Cover Image URL *
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-colors ${
                  validationErrors.image
                    ? 'border-red-300 focus:border-red-300 focus:ring-red-500'
                    : 'border-coffee-300 focus:border-coffee-500'
                }`}
                placeholder="https://example.com/book-cover.jpg"
              />
              {validationErrors.image && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{validationErrors.image}</span>
                </p>
              )}
              <p className="mt-1 text-sm text-coffee-500">
                Enter a valid URL for the book cover image. You can use stock photo URLs from Pexels or other sources.
              </p>
              
              {/* Image Preview */}
              {formData.image && isValidUrl(formData.image) && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-coffee-700 mb-2">Preview:</p>
                  <img
                    src={formData.image}
                    alt="Book cover preview"
                    className="w-32 h-40 object-cover rounded-lg border border-coffee-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-coffee-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-colors resize-vertical ${
                  validationErrors.description
                    ? 'border-red-300 focus:border-red-300 focus:ring-red-500'
                    : 'border-coffee-300 focus:border-coffee-500'
                }`}
                placeholder="Enter a brief description of the book..."
              />
              <div className="flex justify-between items-center mt-1">
                {validationErrors.description ? (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{validationErrors.description}</span>
                  </p>
                ) : (
                  <span></span>
                )}
                <span className="text-sm text-coffee-500">
                  {formData.description.length}/1000
                </span>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6 border-t border-coffee-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-coffee-600 hover:bg-coffee-700 disabled:bg-coffee-400 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    <span>{isEditing ? 'Update Book' : 'Add Book'}</span>
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-coffee-100 hover:bg-coffee-200 text-coffee-800 py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditBook;