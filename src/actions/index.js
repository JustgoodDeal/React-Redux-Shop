
const booksRequested = () => {
  return {
    type: 'FETCH_BOOKS_REQUEST',
  };
};

const booksLoaded = (newBooks) => {
  return {
    type: 'FETCH_BOOKS_SUCCESS',
    payload: newBooks
  };
};

const errorOccurred = (err) => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: err
  };
};

const addBookToCart = (bookId) => {
  return {
    type: 'ADD_BOOK_TO_CART',
    payload: bookId
  };
};

const increaseBookCount = (bookId) => {
  return {
    type: 'INCREASE_BOOK_COUNT_IN_CART',
    payload: bookId
  };
};

const decreaseBookCount = (bookId) => {
  return {
    type: 'DECREASE_BOOK_COUNT_IN_CART',
    payload: bookId
  };
};

const removeBook = (bookId) => {
  return {
    type: 'REMOVE_BOOK_FROM_CART',
    payload: bookId
  };
};

// const fetchBooksOld = (dispatch, bookstoreService) => () => {
//   dispatch(booksRequested());
//   bookstoreService.getBooks()
//       .then((data) => dispatch(booksLoaded(data)))
//       .catch((err) => dispatch(errorOccurred(err)));
// };

const fetchBooks = (bookstoreService) => () => (dispatch) => {
  dispatch(booksRequested());
  bookstoreService.getBooks()
      .then((data) => dispatch(booksLoaded(data)))
      .catch((err) => dispatch(errorOccurred(err)));
};

export {
  fetchBooks,
  addBookToCart,
  increaseBookCount,
  decreaseBookCount,
  removeBook
};
