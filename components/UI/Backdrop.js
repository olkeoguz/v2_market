import React from 'react';
import styles from './Backdrop.module.css';

const Backdrop = ({ click }) => {
  return <div onClick={click} className={styles.Backdrop}></div>;
};

export default Backdrop;
