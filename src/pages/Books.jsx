import React, { useState } from 'react';
import { Filter, Grid, List, SortAsc, Search } from 'lucide-react';
import { useBooks } from '../contexts/BookContext';
import BookCard from '../components/BookCard';

const Books = () => {
  const { 
    getFilteredBooks, 
    getGenres, 
    searchQuery, 
    setSearchQuery, 
    genreFilter, 
    setGenreFilter,
    loading 
  } = useBooks();
  
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);

  const books = getFilteredBooks();
  const genres = getGenres();

  const sortedBooks = books.sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title) * order;
      case 'author':
        return a.author.localeCompare(b.author) * order;
      case 'price':
        return (a.price - b.price) * order;
      case 'rating':
        return (a.rating - b.rating) * order;
      case 'publicationDate':
        return (new Date(a.publicationDate) - new Date(b.publicationDate)) * order;
      default:
        return 0;
    }
  });

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-600 mx-auto mb-4"></div>
          <p className="text-coffee-600">Loading books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-coffee-900 mb-4">
            Our Book Collection
          </h1>
          <p className="text-xl text-coffee-600">
            Discover your next favorite book from our curated selection
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-coffee-400" />
                <input
                  type="text"
                  placeholder="Search books, authors, genres..."
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

            {/* Sort */}
            <div className="w-full lg:w-48">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="w-full px-4 py-3 border border-coffee-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
              >
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="author-asc">Author A-Z</option>
                <option value="author-desc">Author Z-A</option>
                <option value="price-asc">Price Low-High</option>
                <option value="price-desc">Price High-Low</option>
                <option value="rating-desc">Rating High-Low</option>
                <option value="rating-asc">Rating Low-High</option>
                <option value="publicationDate-desc">Newest First</option>
                <option value="publicationDate-asc">Oldest First</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex rounded-lg border border-coffee-300 overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${
                  viewMode === 'grid'
                    ? 'bg-coffee-600 text-white'
                    : 'bg-white text-coffee-600 hover:bg-coffee-50'
                } transition-colors`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${
                  viewMode === 'list'
                    ? 'bg-coffee-600 text-white'
                    : 'bg-white text-coffee-600 hover:bg-coffee-50'
                } transition-colors`}
              >
                <List className="h-5 w-5" />
              </button>
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
            Showing {sortedBooks.length} {sortedBooks.length === 1 ? 'book' : 'books'}
            {(searchQuery || genreFilter) && ' matching your criteria'}
          </p>
        </div>

        {/* Books Grid/List */}
        {sortedBooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold text-coffee-900 mb-2">No books found</h3>
            <p className="text-coffee-600 mb-6">
              Try adjusting your search criteria or browse all books
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
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {sortedBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-32 h-48 object-cover"
                  />
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-serif font-semibold text-coffee-900 mb-2">
                          {book.title}
                        </h3>
                        <p className="text-coffee-600 mb-2">{book.author}</p>
                        <div className="flex items-center space-x-1 mb-2">
                          {Array.from({ length: 5 }, (_, index) => (
                            <span
                              key={index}
                              className={`text-sm ${
                                index < Math.floor(book.rating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="text-sm text-coffee-500 ml-1">
                            ({book.rating.toFixed(1)})
                          </span>
                        </div>
                        <span className="inline-block px-3 py-1 bg-coffee-100 text-coffee-800 text-xs rounded-full mb-3">
                          {book.genre}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-coffee-800 mb-2">
                          ${book.price.toFixed(2)}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          book.inStock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {book.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                    <p className="text-coffee-600 text-sm mb-4 line-clamp-2">
                      {book.description}
                    </p>
                    <div className="flex space-x-3">
                      <Link
                        to={`/books/${book.id}`}
                        className="bg-coffee-100 hover:bg-coffee-200 text-coffee-800 px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        View Details
                      </Link>
                      <button className="bg-coffee-600 hover:bg-coffee-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;