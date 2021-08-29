import React, { useState } from 'react';

import SingleProduct from './SingleProduct';
import Pagination from '../../components/Pagination/Pagination';

import { useSelector } from 'react-redux';

import styles from './ProductList.module.css';

const ProductList = ({ scrollToTop }) => {
  const { filteredProducts } = useSelector((state) => state.products);
  const [category, setCategory] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);
  const [numPerPage] = useState(16);

  let availableProducts = [];

  if (category === 'mug') {
    availableProducts = filteredProducts.filter((p) => p.itemType === 'mug');
  } else if (category === 'shirt') {
    availableProducts = filteredProducts.filter((p) => p.itemType === 'shirt');
  } else {
    availableProducts = [...filteredProducts];
  }

  const totalNum = availableProducts.length;

  const indexOfLastResult = currentPage * numPerPage;
  const indexOfFirstResult = indexOfLastResult - numPerPage;
  const currentResults = availableProducts.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const paginate = (pageNumber) => {
    if (pageNumber === '...') {
      return;
    }
    setCurrentPage(pageNumber);
    scrollToTop.current.scrollIntoView();
  };

  const pickCategory = (category) => {
    setCategory(category);
  };

  return (
    <>
      <div>
        <h2 className={styles.title}>Products</h2>
        <div className={styles.links}>
          <button
            onClick={() => pickCategory('all')}
            className={category === 'all' ? styles.active : ''}
          >
            All
          </button>
          <button
            onClick={() => pickCategory('mug')}
            className={category == 'mug' ? styles.active : ''}
          >
            Mugs
          </button>
          <button
            onClick={() => pickCategory('shirt')}
            className={category == 'shirt' ? styles.active : ''}
          >
            Shirts
          </button>
        </div>
        <div className={styles.ProductList}>
          {!!currentResults.length &&
            currentResults.map((product, index) => (
              <SingleProduct key={index} product={product} />
            ))}
        </div>
        <Pagination
          numPerPage={numPerPage}
          totalNum={totalNum}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default ProductList;
