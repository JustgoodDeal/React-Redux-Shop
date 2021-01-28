import React from 'react';
import './app.css';
import { CartPage } from '../cart-page'
import BookList from "../book-list";
import ShopHeader from '../shop-header'
import ShoppingCartTable from "../shopping-cart-table/shopping-cart-table";


import { Route, Switch } from 'react-router-dom';


const App = () => {
  return (
        <main role="main" className="container">
            <ShopHeader total={210}/>
          <Switch>
            <Route path="/"
                   component={BookList}
                   exact />
            <Route path="/cart"
                   component={CartPage} />
            <Route
                render={() => <h2> Page not found </h2>}/>
          </Switch>
            <ShoppingCartTable />
        </main>
  )
};

export default App;
