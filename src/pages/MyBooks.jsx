import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Filter, BookOpen } from 'lucide-react';
import { useBooks } from '../contexts/BookContext';
import { useAuth } from '../contexts/AuthContext';
import BookCard from '../components/BookCard';

const MyBooks = () => {
  const { books, deleteBook } = useBooks();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  // Filter books added by current user
  const myBooks = books.filter(book => book.addedBy === user?.id || book.addedBy === user?.username);
  
  // Apply search and genre filters
  const filteredBooks = myBooks.filter(book => {
    const matchesSearch = !searchQuery || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = !genreFilter || book.genre === genreFilter;
    
    return matchesSearch && matchesGenre;
  });

  // Get unique genres from user's books
  const genres = [...new Set(myBooks.map(book => book.genre))];

  const handleEdit = (book) => {
    navigate(`/edit-book/${book.id}`);
  };

  const handleDeleteClick = (bookId) => {
    const book = books.find(b => b.id === bookId);
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (bookToDelete) {
      deleteBook(bookToDelete.id);
      setShowDeleteModal(false);
      setBookToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setBookToDelete(null);
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-serif font-bold text-coffee-900 mb-4">
              My Books
            </h1>
            <p className="text-coffee-600">
              Manage your book collection ({myBooks.length} {myBooks.length === 1 ? 'book' : 'books'})
            </p>
          </div>
          
          <Link
            to="/add-book"
            className="bg-coffee-600 hover:bg-coffee-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Book</span>
          </Link>
        </div>

        {myBooks.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <BookOpen className="mx-auto h-24 w-24 text-coffee-300 mb-8" />
            <h3 className="text-2xl font-serif font-semibold text-coffee-900 mb-4">
              No books yet
            </h3>
            <p className="text-coffee-600 mb-8 max-w-md mx-auto">
              Start building your collection by adding your first book. Share your favorite reads with the BookHaven community.
            </p>
            <Link
              to="/add-book"
              className="inline-flex items-center space-x-2 bg-coffee-600 hover:bg-coffee-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              <Plus className="h-6 w-6" />
              <span>Add Your First Book</span>
            </Link>
          </div>
        ) : (
          <>
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-coffee-400" />
                    <input
                      type="text"
                      placeholder="Search your books..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-coffee-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Genre Filter */}
                <div className="w-full lg:w-48">
                  <select
                    value={genreFilter}
                    onChange={(e) => setGenreFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-coffee-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                  >
                    <option value="">All Genres</option>
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {(searchQuery || genreFilter) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {searchQuery && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-coffee-100 text-coffee-800">
                      Search: "{searchQuery}"
                      <button
                        onClick={() => setSearchQuery('')}
                        className="ml-2 text-coffee-600 hover:text-coffee-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {genreFilter && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-coffee-100 text-coffee-800">
                      Genre: {genreFilter}
                      <button
                        onClick={() => setGenreFilter('')}
                        className="ml-2 text-coffee-600 hover:text-coffee-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-coffee-600">
                Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
                {(searchQuery || genreFilter) && ' matching your criteria'}
              </p>
            </div>

            {/* Books Grid */}
            {filteredBooks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-coffee-900 mb-2">No books found</h3>
                <p className="text-coffee-600 mb-6">
                  Try adjusting your search criteria or browse all your books
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setGenreFilter('');
                  }}
                  className="bg-coffee-600 hover:bg-coffee-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    showActions={true}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-coffee-900">
                    Delete Book
                  </h3>
                </div>
              </div>
              
              <p className="text-coffee-600 mb-6">
                Are you sure you want to delete "{bookToDelete?.title}"? This action cannot be undone.
              </p>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={handleDeleteCancel}
                  className="flex-1 bg-coffee-100 hover:bg-coffee-200 text-coffee-800 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooks;