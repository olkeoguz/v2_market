import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART } from '../actions/cart';

const initialState = {
  cartItems: {},
  cartTotal: 0,
  numOfCartItems: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, price } = action.product;

      let newQuantity = 0;

      //Item is in the cart
      if (state.cartItems[id]) {
        newQuantity = state.cartItems[id].quantity + 1;
      } else {
        newQuantity = 1;
      }
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [id]: {
            ...action.product,
            quantity: newQuantity,
            itemTotal: action.product.price,
          },
        },
        cartTotal: state.cartTotal + price,
        numOfCartItems: state.numOfCartItems + 1,
      };

    case REMOVE_FROM_CART:
      const prodId = action.id;
      let newItemTotal = 0;
      let updatedCartItems = { ...state.cartItems };

      //Item quantity is not 1,
      if (state.cartItems[prodId].quantity > 1) {
        newItemTotal =
          state.cartItems[prodId].itemTotal - state.cartItems[prodId].price;
        updatedCartItems = {
          ...state.cartItems,
          [prodId]: {
            ...state.cartItems[prodId],
            quantity: state.cartItems[prodId].quantity - 1,
            itemTotal: newItemTotal,
          },
        };
      } else {
        delete updatedCartItems[prodId];
      }

      return {
        ...state,
        cartTotal: state.cartTotal - state.cartItems[prodId].price,
        itemTotal: newItemTotal,
        cartItems: updatedCartItems,
        numOfCartItems: state.numOfCartItems - 1,
      };

    case EMPTY_CART: {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
};

export default cartReducer;
