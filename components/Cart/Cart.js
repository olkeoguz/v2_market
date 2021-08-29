import React from 'react';
import styles from './Cart.module.css';

import {
  faMinus,
  faPlus,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../store/actions/cart';

const Cart = ({ mobile }) => {
  const { cartItems, cartTotal } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  let itemsInCart = [];

  for (let key in cartItems) {
    itemsInCart.push(cartItems[key]);
  }

  const handleQuantity = (item, status) => {
    if (status === 'minus') {
      dispatch(cartActions.removeFromCart(item.id));
    } else {
      dispatch(cartActions.addToCart(item));
    }
  };

  if (!itemsInCart.length) {
    return (
      <div
        className={
          mobile ? `${styles.Cart}` : `${styles.Cart} ${styles.Sticky}`
        }
      >
        <div className={styles.emptyCart}>
          <FontAwesomeIcon
            icon={faShoppingCart}
            size='2x'
            className={styles.shopIcon}
          />
          <h5>Your cart is empty...</h5>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.Cart}>
      {!!itemsInCart.length &&
        itemsInCart.map((item, index) => (
          <div key={index} className={styles.cartItem}>
            <div className={styles.namePrice}>
              <p>{item.name}</p>
              <small>₺ {item.price}</small>
            </div>
            <div className={styles.quantitiyContainer}>
              <FontAwesomeIcon
                icon={faMinus}
                className={styles.btn}
                onClick={() => handleQuantity(item, 'minus')}
              />
              <div className={styles.quantity}>
                <p>{item.quantity}</p>
              </div>
              <FontAwesomeIcon
                icon={faPlus}
                className={styles.btn}
                onClick={() => handleQuantity(item, 'plus')}
              />
            </div>
          </div>
        ))}
      <div className={styles.totalPrice}>
        <button onClick={() => dispatch(cartActions.emptyCart())}>
          Empty Cart
        </button>
        <div>
          <small>₺{cartTotal.toFixed(2)}</small>
        </div>
      </div>
    </div>
  );
};

export default Cart;
