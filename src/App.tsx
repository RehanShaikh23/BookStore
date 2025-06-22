import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';

// Lazy load all components
const Header = React.lazy(() => import('./components/Header'));
const Footer = React.lazy(() => import('./components/Footer'));
const Home = React.lazy(() => import('./pages/Home'));
const Books = React.lazy(() => import('./pages/Books'));
const BookDetail = React.lazy(() => import('./pages/BookDetail'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const MyBooks = React.lazy(() => import('./pages/MyBooks'));
const AddEditBook = React.lazy(() => import('./pages/AddEditBook'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-cream flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-600 mx-auto mb-4"></div>
      <p className="text-coffee-600 font-medium">Loading...</p>
    </div>
  </div>
);

// Page loading component for smaller sections
const PageLoadingSpinner = () => (
  <div className="flex items-center justify-center py-8">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coffee-600 mx-auto mb-2"></div>
      <p className="text-coffee-600 text-sm">Loading...</p>
    </div>
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Suspense fallback={<PageLoadingSpinner />}>
        <Header />
      </Suspense>
      <main className="flex-1">
        <Suspense fallback={<LoadingSpinner />}>
          {children}
        </Suspense>
      </main>
      <Suspense fallback={<PageLoadingSpinner />}>
        <Footer />
      </Suspense>
    </div>
  );
};

const AppContent = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route 
          path="/login" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Login />
            </Suspense>
          } 
        />
        <Route 
          path="/register" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Register />
            </Suspense>
          } 
        />
        <Route path="/*" element={
          <AppLayout>
            <Routes>
              <Route 
                path="/" 
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Home />
                  </Suspense>
                } 
              />
              <Route 
                path="/books" 
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Books />
                  </Suspense>
                } 
              />
              <Route 
                path="/books/:id" 
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <BookDetail />
                  </Suspense>
                } 
              />
              <Route 
                path="/cart" 
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Cart />
                  </Suspense>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingSpinner />}>
                      <Dashboard />
                    </Suspense>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/my-books" 
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingSpinner />}>
                      <MyBooks />
                    </Suspense>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/add-book" 
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingSpinner />}>
                      <AddEditBook />
                    </Suspense>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/edit-book/:id" 
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingSpinner />}>
                      <AddEditBook />
                    </Suspense>
                  </ProtectedRoute>
                } 
              />
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
        <Suspense fallback={<LoadingSpinner />}>
          <AppContent />
        </Suspense>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;