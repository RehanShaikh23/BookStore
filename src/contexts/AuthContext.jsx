import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Check for existing user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(storedUser) });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => 
        (u.email === credentials.email || u.username === credentials.username) && 
        u.password === credentials.password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        dispatch({ type: 'LOGIN', payload: userWithoutPassword });
        return { success: true };
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Invalid credentials' });
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed' });
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get existing users
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === userData.email || u.username === userData.username);
      if (existingUser) {
        dispatch({ type: 'SET_ERROR', payload: 'User already exists' });
        return { success: false, error: 'User already exists' };
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      const { password, ...userWithoutPassword } = newUser;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      dispatch({ type: 'LOGIN', payload: userWithoutPassword });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Registration failed' });
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      clearError,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};