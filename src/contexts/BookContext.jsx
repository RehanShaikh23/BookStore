import React, { createContext, useContext, useReducer, useEffect } from 'react';

const BookContext = createContext();

const initialBooks = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publicationDate: '1925-04-10',
    genre: 'Classic Literature',
    description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
    price: 12.99,
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
    rating: 4.5,
    inStock: true,
    addedBy: 'admin'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publicationDate: '1960-07-11',
    genre: 'Fiction',
    description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
    price: 14.99,
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
    rating: 4.8,
    inStock: true,
    addedBy: 'admin'
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    publicationDate: '1949-06-08',
    genre: 'Dystopian Fiction',
    description: 'A dystopian social science fiction novel exploring totalitarianism and surveillance.',
    price: 13.99,
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
    rating: 4.7,
    inStock: true,
    addedBy: 'admin'
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    publicationDate: '1813-01-28',
    genre: 'Romance',
    description: 'A romantic novel that critiques the British landed gentry at the end of the 18th century.',
    price: 11.99,
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
    rating: 4.6,
    inStock: true,
    addedBy: 'admin'
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    publicationDate: '1951-07-16',
    genre: 'Coming-of-age Fiction',
    description: 'A controversial novel about teenage rebellion and alienation in post-war America.',
    price: 13.50,
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
    rating: 4.3,
    inStock: true,
    addedBy: 'admin'
  },
  {
    id: '6',
    title: 'Lord of the Flies',
    author: 'William Golding',
    publicationDate: '1954-09-17',
    genre: 'Allegorical Fiction',
    description: 'A gripping tale of British boys stranded on an uninhabited island and their struggle for survival.',
    price: 12.50,
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
    rating: 4.4,
    inStock: true,
    addedBy: 'admin'
  }
];

const bookReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return {
        ...state,
        books: action.payload,
        loading: false,
      };
    case 'ADD_BOOK':
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case 'UPDATE_BOOK':
      return {
        ...state,
        books: state.books.map(book =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case 'DELETE_BOOK':
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload),
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };
    case 'SET_GENRE_FILTER':
      return {
        ...state,
        genreFilter: action.payload,
      };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, {
    books: [],
    cart: [],
    loading: true,
    searchQuery: '',
    genreFilter: '',
  });

  useEffect(() => {
    // Initialize books from localStorage or use default
    const storedBooks = localStorage.getItem('books');
    const storedCart = localStorage.getItem('cart');
    
    if (storedBooks) {
      dispatch({ type: 'SET_BOOKS', payload: JSON.parse(storedBooks) });
    } else {
      localStorage.setItem('books', JSON.stringify(initialBooks));
      dispatch({ type: 'SET_BOOKS', payload: initialBooks });
    }

    if (storedCart) {
      dispatch({ type: 'CLEAR_CART' });
      JSON.parse(storedCart).forEach(item => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
      });
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const addBook = (bookData) => {
    const newBook = {
      ...bookData,
      id: Date.now().toString(),
      rating: 0,
      inStock: true,
    };
    
    const updatedBooks = [...state.books, newBook];
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    dispatch({ type: 'ADD_BOOK', payload: newBook });
    return newBook;
  };

  const updateBook = (bookData) => {
    const updatedBooks = state.books.map(book =>
      book.id === bookData.id ? bookData : book
    );
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    dispatch({ type: 'UPDATE_BOOK', payload: bookData });
  };

  const deleteBook = (bookId) => {
    const updatedBooks = state.books.filter(book => book.id !== bookId);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    dispatch({ type: 'DELETE_BOOK', payload: bookId });
  };

  const getFilteredBooks = () => {
    let filtered = state.books;

    if (state.searchQuery) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    if (state.genreFilter) {
      filtered = filtered.filter(book => book.genre === state.genreFilter);
    }

    return filtered;
  };

  const getGenres = () => {
    return [...new Set(state.books.map(book => book.genre))];
  };

  const addToCart = (book) => {
    dispatch({ type: 'ADD_TO_CART', payload: book });
  };

  const removeFromCart = (bookId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: bookId });
  };

  const updateCartQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: bookId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <BookContext.Provider value={{
      ...state,
      addBook,
      updateBook,
      deleteBook,
      getFilteredBooks,
      getGenres,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount,
      setSearchQuery: (query) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query }),
      setGenreFilter: (genre) => dispatch({ type: 'SET_GENRE_FILTER', payload: genre }),
    }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};