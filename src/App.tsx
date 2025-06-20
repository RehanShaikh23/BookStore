import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import MyBooks from './pages/MyBooks';
import AddEditBook from './pages/AddEditBook';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-600"></div>
      </div>
    );
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

const AppContent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/my-books" element={<ProtectedRoute><MyBooks /></ProtectedRoute>} />
              <Route path="/add-book" element={<ProtectedRoute><AddEditBook /></ProtectedRoute>} />
              <Route path="/edit-book/:id" element={<ProtectedRoute><AddEditBook /></ProtectedRoute>} />
            </Routes>
          </AppLayout>
        } />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <AppContent />
      </BookProvider>
    </AuthProvider>
  );
}

export default App;
