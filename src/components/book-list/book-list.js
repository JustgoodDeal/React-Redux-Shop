import React, { Component } from 'react';
import BookListItem from '../book-list-item';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import ErrorIndicator from "../error-indicator";
import Spinner from '../spinner'
import { withBookstoreService } from '../hoc';
import { fetchBooks, addBookToCart } from '../../actions';

import './book-list.css';


const BookList = ({ books, addBookToCart }) => {
  return (
      <ul className="book-list">
        {
          books.map((book) => {
            return (
                <li key={book.id}>
                  <BookListItem
                      book={book}
                      addBookToCart={() => addBookToCart(book.id)} />
                </li>
            );
          })
        }
      </ul>
  );
};

class BookListContainer extends Component {

  componentDidMount() {

    // const { bookstoreService, booksLoaded, booksRequested, errorOccurred } = this.props;
    // booksRequested();
    // bookstoreService.getBooks()
    //     .then((data) => {
    //       booksLoaded(data);
    //     })
    //     .catch((err) => errorOccurred(err));

    this.props.fetchBooks();

  }

  render() {
    const { books, loading, error, addBookToCart } = this.props;

    if (error) {
      return <ErrorIndicator
          error={error} />
    }

    if (loading) {
      return <Spinner />
    }

    return <BookList books={books}
                     addBookToCart={addBookToCart} />;
  }
}

const mapStateToProps = ({bookList: { books, loading, error }}) => {
  return {
    books,
    loading,
    error
  };
};

// const mapDispatchToProps = {
//   booksLoaded,
//   booksRequested,
//   errorOccurred
// };

// const mapDispatchToPropsOld = (dispatch, ownProps) => {
//   const { bookstoreService } = ownProps;
//   return {
//     fetchBooks: fetchBooks(dispatch, bookstoreService),
//     addBookToCart: (id) => dispatch(addBookToCart(id))
//     }
// };

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
  return bindActionCreators({
    fetchBooks: fetchBooks(bookstoreService),
    addBookToCart: addBookToCart
  }, dispatch);
};

export default withBookstoreService()(connect(
    mapStateToProps, mapDispatchToProps)(BookListContainer))
