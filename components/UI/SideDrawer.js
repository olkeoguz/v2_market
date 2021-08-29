import React, { useState } from 'react';

import Cart from '../Cart/Cart';
import Brands from '../Filters/Brands';
import Sorting from '../Filters/Sorting';
import Tags from '../Filters/Tags';

import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './/SideDrawer.module.css';

const SideDrawer = ({ show }) => {
  const [showCart, setShowCart] = useState(false);
  return (
    <div
      className={
        show ? `${styles.sideDrawer} ${styles.open}` : styles.sideDrawer
      }
    >
      <button onClick={() => setShowCart(!showCart)}>
        <span>Cart</span>
        <FontAwesomeIcon icon={showCart ? faSortUp : faSortDown} size='1x' />
      </button>
      {showCart && <Cart mobile />}
      <Sorting />
      <Brands />
      <Tags />
    </div>
  );
};

export default SideDrawer;
