import React from 'react';
import Image from 'next/image';

import Logo from '../../assets/Logo.png';

import { useSelector } from 'react-redux';

import { faLock, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Header.module.css';

const Header = ({ handleClick }) => {
  const { cartTotal } = useSelector((state) => state.cart);

  return (
    <div className={styles.header}>
      <FontAwesomeIcon
        icon={faBars}
        color='white'
        size='2x'
        className={styles.drawerMenu}
        onClick={handleClick}
      />
      <Image
        src={Logo}
        objectFit='contain'
        width={141}
        height={30}
        alt='Picture of the author'
        className={styles.image}
      />
      <div className={styles.totalPriceContainer}>
        <FontAwesomeIcon icon={faLock} />
        <p className={styles.price}>₺ {Math.abs(cartTotal).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Header;
