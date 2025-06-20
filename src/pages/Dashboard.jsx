import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShoppingCart, User, Plus, TrendingUp, Calendar, Star, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../contexts/BookContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { books, cart, getCartTotal } = useBooks();

  // Filter books added by current user
  const myBooks = books.filter(book => book.addedBy === user?.id || book.addedBy === user?.username);
  
  // Calculate stats
  const totalBooks = myBooks.length;
  const totalValue = myBooks.reduce((sum, book) => sum + book.price, 0);
  const averageRating = myBooks.length > 0 
    ? myBooks.reduce((sum, book) => sum + book.rating, 0) / myBooks.length 
    : 0;
  const cartItems = cart.length;
  const cartValue = getCartTotal();

  // Recent books (last 3 added)
  const recentBooks = myBooks
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 3);

  // Genre distribution
  const genreStats = myBooks.reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1;
    return acc;
  }, {});

  const topGenres = Object.entries(genreStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const quickActions = [
    {
      title: 'Add New Book',
      description: 'Add a book to your collection',
      icon: Plus,
      link: '/add-book',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Browse Books',
      description: 'Discover new books to read',
      icon: Eye,
      link: '/books',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'My Collection',
      description: 'Manage your books',
      icon: BookOpen,
      link: '/my-books',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Shopping Cart',
      description: 'View items in your cart',
      icon: ShoppingCart,
      link: '/cart',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-coffee-900 mb-4">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-coffee-600">
            Here's an overview of your BookHaven activity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-coffee-600 text-sm font-medium">My Books</p>
                <p className="text-3xl font-bold text-coffee-900">{totalBooks}</p>
              </div>
              <div className="bg-coffee-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-coffee-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link
                to="/my-books"
                className="text-coffee-600 hover:text-coffee-800 text-sm font-medium transition-colors"
              >
                View collection →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-coffee-600 text-sm font-medium">Collection Value</p>
                <p className="text-3xl font-bold text-coffee-900">${totalValue.toFixed(2)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-green-600 text-sm font-medium">
                Average: ${totalBooks > 0 ? (totalValue / totalBooks).toFixed(2) : '0.00'} per book
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-coffee-600 text-sm font-medium">Average Rating</p>
                <p className="text-3xl font-bold text-coffee-900">{averageRating.toFixed(1)}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${
                      index < Math.floor(averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-coffee-600 text-sm font-medium">Cart Items</p>
                <p className="text-3xl font-bold text-coffee-900">{cartItems}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-orange-600 text-sm font-medium">
                Total: ${cartValue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif font-bold text-coffee-900 mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full text-white transition-colors ${action.color}`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-coffee-900 group-hover:text-coffee-700 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-coffee-600 text-sm">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Recent Books */}
            {recentBooks.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif font-bold text-coffee-900">
                    Recently Added Books
                  </h2>
                  <Link
                    to="/my-books"
                    className="text-coffee-600 hover:text-coffee-800 font-medium transition-colors"
                  >
                    View all →
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentBooks.map((book) => (
                    <div key={book.id} className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/books/${book.id}`}
                          className="font-semibold text-coffee-900 hover:text-coffee-700 transition-colors"
                        >
                          {book.title}
                        </Link>
                        <p className="text-coffee-600 text-sm">{book.author}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm bg-coffee-100 text-coffee-800 px-2 py-1 rounded-full">
                            {book.genre}
                          </span>
                          <span className="text-coffee-800 font-medium">
                            ${book.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-coffee-600">{book.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-coffee-600 text-white w-12 h-12 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-coffee-900">{user?.username}</h3>
                  <p className="text-coffee-600 text-sm">{user?.email}</p>
                </div>
              </div>
              <div className="text-sm text-coffee-600">
                <div className="flex justify-between py-2">
                  <span>Member since:</span>
                  <span>{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Books added:</span>
                  <span>{totalBooks}</span>
                </div>
              </div>
            </div>

            {/* Top Genres */}
            {topGenres.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-semibold text-coffee-900 mb-4">Your Top Genres</h3>
                <div className="space-y-3">
                  {topGenres.map(([genre, count]) => (
                    <div key={genre} className="flex justify-between items-center">
                      <span className="text-coffee-700 text-sm">{genre}</span>
                      <div className="flex items-center space-x-2">
                        <div className="bg-coffee-200 rounded-full h-2 w-16">
                          <div
                            className="bg-coffee-600 h-2 rounded-full"
                            style={{ width: `${(count / totalBooks) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-coffee-600 text-sm font-medium">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity Summary */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-coffee-900 mb-4">This Month</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-coffee-600">Books added:</span>
                  <span className="font-medium text-coffee-900">
                    {myBooks.filter(book => {
                      const bookDate = new Date(book.createdAt || 0);
                      const now = new Date();
                      return bookDate.getMonth() === now.getMonth() && bookDate.getFullYear() === now.getFullYear();
                    }).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-coffee-600">Cart value:</span>
                  <span className="font-medium text-coffee-900">${cartValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-coffee-600">Favorite genre:</span>
                  <span className="font-medium text-coffee-900">
                    {topGenres.length > 0 ? topGenres[0][0] : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;