import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  
  const { login, loading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
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

    const result = await login(formData);
    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-coffee-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-serif font-bold text-coffee-900">
            Welcome Back
          </h2>
          <p className="mt-4 text-coffee-600">
            Sign in to your BookHaven account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-coffee-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-coffee-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-colors ${
                    validationErrors.email
                      ? 'border-red-300 focus:border-red-300 focus:ring-red-500'
                      : 'border-coffee-300 focus:border-coffee-500'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-coffee-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-coffee-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-colors ${
                    validationErrors.password
                      ? 'border-red-300 focus:border-red-300 focus:ring-red-500'
                      : 'border-coffee-300 focus:border-coffee-500'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-coffee-400 hover:text-coffee-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a href="#" className="text-sm text-coffee-600 hover:text-coffee-800 transition-colors">
                Forgot your password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-coffee-600 hover:bg-coffee-700 disabled:bg-coffee-400 text-white py-3 px-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-coffee-50 rounded-lg">
            <p className="text-sm text-coffee-700 font-medium mb-2">Demo Credentials:</p>
            <div className="text-xs text-coffee-600 space-y-1">
              <p>Email: demo@bookhaven.com</p>
              <p>Password: demo123</p>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-coffee-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-coffee-800 hover:text-coffee-900 transition-colors"
              >
                Create one here
              </Link>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="text-center space-y-4">
          <p className="text-coffee-600 text-sm">
            Join thousands of book lovers and discover your next favorite read
          </p>
          <div className="flex justify-center space-x-8 text-coffee-500">
            <div className="text-center">
              <div className="text-2xl font-bold">10k+</div>
              <div className="text-xs">Books</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">50k+</div>
              <div className="text-xs">Readers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4.8★</div>
              <div className="text-xs">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;