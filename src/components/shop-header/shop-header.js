import React from 'react';
import { Link } from 'react-router-dom'
import {connect} from "react-redux";

import './shop-header.css';


const ShopHeader = ({ cartItemsCount, cartItemsTotalPrice }) => {
  return (
    <header className="shop-header row">
        <Link to="/">
            <div className="logo text-dark">Shop</div>
        </Link>
        <Link to="/cart">
          <div className="shopping-cart">
            <i className="cart-icon fa fa-shopping-cart" />
            {cartItemsCount} items (${cartItemsTotalPrice})
          </div>
        </Link>
    </header>
  );
};

const mapStateToProps = ({cart: { cartItemsCount, cartItemsTotalPrice }}) => {
    return {
        cartItemsCount,
        cartItemsTotalPrice
    };
};

export default connect(mapStateToProps, {})(ShopHeader);
