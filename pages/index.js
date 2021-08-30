import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Header from '../components/UI/Header';
import Backdrop from '../components/UI/Backdrop';
import SideDrawer from '../components/UI/SideDrawer';

import Brands from '../components/Filters/Brands';
import Tags from '../components/Filters/Tags';
import Sorting from '../components/Filters/Sorting';

import ProductList from '../components/Products/ProductList';
import Cart from '../components/Cart/Cart';

import { useDispatch } from 'react-redux';
import * as productActions from '../store/actions/products';

import styles from '../styles/Home.module.css';

export default function Home({ products }) {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const scrollToProductsRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.setProducts(products));
  }, [products]);

  const handleDrawerToggleClick = () => {
    setSideDrawerOpen((prevDrawerState) => !prevDrawerState);
  };

  const handleBackDropClick = () => {
    setSideDrawerOpen(false);
  };

  let backdrop;

  if (sideDrawerOpen) {
    backdrop = <Backdrop click={handleBackDropClick} />;
  }

  return (
    <>
      <Header handleClick={handleDrawerToggleClick} />
      <div className={styles.container} ref={scrollToProductsRef}>
        <SideDrawer show={sideDrawerOpen} />
        {backdrop}
        <div className={styles.grid}>
          <div className={styles.first}>
            <Sorting />
            <Brands />
            <Tags />
          </div>
          <div className={styles.second}>
            <ProductList scrollToTop={scrollToProductsRef} />
          </div>
          <div className={styles.third}>
            <Cart />
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  try {
    // const res = await fetch('https://my-market-db.herokuapp.com/items');
    const res = await fetch('http://localhost:8000/items');

    if (!res.ok) {
      throw new Error('Something went wrong! Cannot fetch the products...');
    }

    const data = await res.json();

    const products = data.map((item) => ({ ...item, id: uuidv4() }));

    products.sort((a, b) => a.price - b.price);

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
