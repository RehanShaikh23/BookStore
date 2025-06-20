import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, AlertCircle, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const { register, loading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    // Calculate password strength
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    setPasswordStrength(strength);
  }, [formData.password]);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters long';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
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
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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

    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);
    if (result.success) {
      navigate('/', { replace: true });
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-blue-500';
      case 4:
      case 5:
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
      case 5:
        return 'Strong';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-coffee-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-serif font-bold text-coffee-900">
            Join BookHaven
          </h2>
          <p className="mt-4 text-coffee-600">
            Create your account and start your reading journey
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-coffee-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-coffee-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-colors ${
                    validationErrors.username
                      ? 'border-red-300 focus:border-red-300 focus:ring-red-500'
                      : 'border-coffee-300 focus:border-coffee-500'
                  }`}
                  placeholder="Choose a username"
                />
              </div>
              {validationErrors.username && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.username}</p>
              )}
            </div>

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
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-colors ${
                    validationErrors.password
                      ? 'border-red-300 focus:border-red-300 focus:ring-red-500'
                      : 'border-coffee-300 focus:border-coffee-500'
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-coffee-400 hover:text-coffee-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-coffee-600">{getPasswordStrengthText()}</span>
                  </div>
                </div>
              )}
              
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-coffee-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-coffee-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-colors ${
                    validationErrors.confirmPassword
                      ? 'border-red-300 focus:border-red-300 focus:ring-red-500'
                      : 'border-coffee-300 focus:border-coffee-500'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-coffee-400 hover:text-coffee-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <CheckCircle className="absolute right-10 top-3 h-5 w-5 text-green-500" />
                )}
              </div>
              {validationErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-coffee-600 focus:ring-coffee-500 border-coffee-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-coffee-700">
                I agree to the{' '}
                <a href="#" className="text-coffee-600 hover:text-coffee-800 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-coffee-600 hover:text-coffee-800 font-medium">
                  Privacy Policy
                </a>
              </label>
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
                'Create Account'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-coffee-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-coffee-800 hover:text-coffee-900 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="text-center space-y-4">
          <p className="text-coffee-600 text-sm">
            Join BookHaven and enjoy these benefits:
          </p>
          <div className="grid grid-cols-3 gap-4 text-coffee-500 text-xs">
            <div className="text-center">
              <div className="text-lg mb-1">📚</div>
              <div>Personalized Recommendations</div>
            </div>
            <div className="text-center">
              <div className="text-lg mb-1">🚚</div>
              <div>Free Shipping</div>
            </div>
            <div className="text-center">
              <div className="text-lg mb-1">⭐</div>
              <div>Exclusive Offers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;