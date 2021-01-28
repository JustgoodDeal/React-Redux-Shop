import React from 'react';
import './shopping-cart-table.css';
import {connect} from "react-redux";

import { increaseBookCount, decreaseBookCount, removeBook } from '../../actions';


const ShoppingCartTable = ({ items, cartItemsTotalPrice, increaseBookCount, decreaseBookCount, removeBook }) => {
  const renderRow = (item, ind) => {
    const { id, title, count, total } = item;
    return (
        <tr key={id}>
          <td>{ind + 1}</td>
          <td>{title}</td>
          <td>{count}</td>
          <td>${total}</td>
          <td className="d-flex">
              <button
                  onClick={() => decreaseBookCount(id)}
                  className="btn btn-outline-warning btn-sm float-right">
                  <i className="fa fa-minus-circle"/>
              </button>
              <button
                  onClick={() => increaseBookCount(id)}
                  className="btn btn-outline-success btn-sm float-right">
                  <i className="fa fa-plus-circle"/>
              </button>
              <button
                  onClick={() => removeBook(id)}
                  className="btn btn-outline-danger btn-sm float-right">
                  <i className="fa fa-trash-o"/>
              </button>
          </td>
        </tr>
    );
  };

  return (
      <div className="shopping-cart-table">
        <h2>Your Order</h2>
        <table className="table">
          <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
          </thead>

          <tbody>
          { items.map(renderRow) }
          </tbody>
        </table>

        <div className="total">
          Total: ${cartItemsTotalPrice}
        </div>
      </div>
  );
};

const mapStateToProps = ({cart: { cartItems, cartItemsTotalPrice }}) => {
    return {
        items: cartItems,
        cartItemsTotalPrice
    };
};

const mapDispatchToProps = {
    increaseBookCount,
    decreaseBookCount,
    removeBook
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);
