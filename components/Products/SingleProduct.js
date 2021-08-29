import React from 'react';
import Image from 'next/image';

import ProductImage from '../../assets/myProduct.png';

import * as cartActions from '../../store/actions/cart';

import styles from './SingleProduct.module.css';

import { useDispatch, useSelector } from 'react-redux';

const SingleProduct = ({ product }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className={styles.Single}>
      <div className={styles.imageContainer}>
        <Image
          src={ProductImage}
          alt='Picture of the author'
          objectFit='cover'
          width={100}
          height={100}
        />
      </div>
      <small className={styles.price}>₺ {product.price}</small>
      <p className={styles.name}>{product.name}</p>
      <button
        className={styles.btn}
        onClick={() => dispatch(cartActions.addToCart(product))}
      >
        Add
      </button>
    </div>
  );
};

export default SingleProduct;
