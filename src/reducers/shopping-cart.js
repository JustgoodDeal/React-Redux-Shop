const updateCartItem = (book, item = {}) => {

  const {id = book.id, count = 0, title = book.title, total = 0} = item;

  return {
    id,
    title,
    count: count + 1,
    total: total + book.price
  };
};

const updateCartItems = (cartItems, item, ind) => {

  if (ind === -1) {
    return [
      ...cartItems,
      item
    ];
  }

  return [
    ...cartItems.slice(0, ind),
    item,
    ...cartItems.slice(ind + 1)
  ];
};

const changeCartItemCount = (item, act) => {

  const {id, count, title, total} = item;

  let newCount = 1;
  let newTotal = total;
  let bookPrice = total / count;
  if (act === 'inc') {
    newCount = count + 1;
    newTotal = total + bookPrice
  } else if (act === 'dec' && count !== 1) {
    newCount = count - 1;
    newTotal = total - bookPrice
  }

  return {
    id,
    title,
    count: newCount,
    total: newTotal
  };
};

const updateCart = (state, action) => {

  if (state === undefined) {
    return {
      cartItems: [],
      cartItemsCount: 0,
      cartItemsTotalPrice: 0
    }
  }

  const {bookList: {books}, cart: {cartItems}} = state;
  let bookId, itemIndex, item, newItem, newCartItems;

  switch (action.type) {
    case 'ADD_BOOK_TO_CART':
      bookId = action.payload;
      itemIndex = cartItems.findIndex(({id}) => id === bookId);
      item = cartItems[itemIndex];
      let book = books.find((book) => book.id === bookId);
      newItem = updateCartItem(book, item);
      newCartItems = updateCartItems(cartItems, newItem, itemIndex);
      return {
        cartItems: newCartItems,
        cartItemsCount: newCartItems.reduce((sum, { count } ) => sum + count, 0),
        cartItemsTotalPrice: newCartItems.reduce((sum, { total } ) => sum + total, 0),
      };

    case 'INCREASE_BOOK_COUNT_IN_CART':
      bookId = action.payload;
      itemIndex = cartItems.findIndex(({id}) => id === bookId);
      item = cartItems[itemIndex];
      newItem = changeCartItemCount(item, 'inc');
      newCartItems = updateCartItems(cartItems, newItem, itemIndex);
      return {
        cartItems: newCartItems,
        cartItemsCount: newCartItems.reduce((sum, { count } ) => sum + count, 0),
        cartItemsTotalPrice: newCartItems.reduce((sum, { total } ) => sum + total, 0),
      };

    case 'DECREASE_BOOK_COUNT_IN_CART':
      bookId = action.payload;
      itemIndex = cartItems.findIndex(({id}) => id === bookId);
      item = cartItems[itemIndex];
      newItem = changeCartItemCount(item, 'dec');
      newCartItems = updateCartItems(cartItems, newItem, itemIndex);
      return {
        cartItems: newCartItems,
        cartItemsCount: newCartItems.reduce((sum, { count } ) => sum + count, 0),
        cartItemsTotalPrice: newCartItems.reduce((sum, { total } ) => sum + total, 0),
      };

    case 'REMOVE_BOOK_FROM_CART':
      bookId = action.payload;
      itemIndex = cartItems.findIndex(({id}) => id === bookId);
      newCartItems = [...cartItems.slice(0, itemIndex), ...cartItems.slice(itemIndex + 1)];
      return {
        cartItems: newCartItems,
        cartItemsCount: newCartItems.reduce((sum, { count } ) => sum + count, 0),
        cartItemsTotalPrice: newCartItems.reduce((sum, { total } ) => sum + total, 0),
      };

    default:
      return state.cart;
  }
};


export default updateCart;
