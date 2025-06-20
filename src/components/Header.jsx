import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Search, ShoppingCart, User, Menu, X, LogOut, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../contexts/BookContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { searchQuery, setSearchQuery, getCartItemCount } = useBooks();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.pathname !== '/books') {
      navigate('/books');
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-cream shadow-lg sticky top-0 z-50 border-b border-coffee-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <BookOpen className="h-8 w-8 text-coffee-600 group-hover:text-coffee-700 transition-colors" />
            <span className="text-2xl font-serif font-bold text-coffee-800 group-hover:text-coffee-900 transition-colors">
              BookHaven
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-coffee-700 hover:text-coffee-900 font-medium transition-colors ${
                isActive('/') ? 'border-b-2 border-coffee-600' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/books"
              className={`text-coffee-700 hover:text-coffee-900 font-medium transition-colors ${
                isActive('/books') ? 'border-b-2 border-coffee-600' : ''
              }`}
            >
              Books
            </Link>
            {isAuthenticated && (
              <Link
                to="/my-books"
                className={`text-coffee-700 hover:text-coffee-900 font-medium transition-colors ${
                  isActive('/my-books') ? 'border-b-2 border-coffee-600' : ''
                }`}
              >
                My Books
              </Link>
            )}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search books, authors, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-coffee-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-coffee-400" />
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-coffee-700 hover:text-coffee-900 hover:bg-coffee-100 rounded-full transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-coffee-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {getCartItemCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 text-coffee-700 hover:text-coffee-900 hover:bg-coffee-100 rounded-lg transition-colors"
                >
                  <User className="h-6 w-6" />
                  <span className="hidden md:block font-medium">{user?.username}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-coffee-200 py-2 z-50">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-coffee-700 hover:bg-coffee-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/add-book"
                      className="block px-4 py-2 text-coffee-700 hover:bg-coffee-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Add Book
                    </Link>
                    <hr className="my-2 border-coffee-200" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-coffee-700 hover:bg-coffee-50 transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-4 py-2 text-coffee-700 hover:text-coffee-900 hover:bg-coffee-100 rounded-lg transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-1 px-4 py-2 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-coffee-700 hover:text-coffee-900 hover:bg-coffee-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-coffee-200 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="px-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-coffee-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-coffee-400" />
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2 px-2">
              <Link
                to="/"
                className="block px-3 py-2 text-coffee-700 hover:bg-coffee-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/books"
                className="block px-3 py-2 text-coffee-700 hover:bg-coffee-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Books
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/my-books"
                    className="block px-3 py-2 text-coffee-700 hover:bg-coffee-100 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Books
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-coffee-700 hover:bg-coffee-100 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/add-book"
                    className="block px-3 py-2 text-coffee-700 hover:bg-coffee-100 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Add Book
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile Auth Buttons */}
            {!isAuthenticated && (
              <div className="px-2 pt-4 border-t border-coffee-200 space-y-2">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-2 text-coffee-700 border border-coffee-300 rounded-lg hover:bg-coffee-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center px-4 py-2 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <div className="px-2 pt-4 border-t border-coffee-200">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-coffee-700 hover:bg-coffee-100 rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;