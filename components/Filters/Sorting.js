import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products';

import styles from './Sorting.module.css';

const Sorting = () => {
  const [option, setOption] = useState('lowToHigh');

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setOption(e.target.id);
  };

  useEffect(() => {
    dispatch(productActions.sortProducts(option));
  }, [option, dispatch]);

  return (
    <>
      <h4 className={styles.title}>Sorting</h4>
      <div className={styles.Sorting}>
        <div>
          <label>
            <input
              type='radio'
              id='lowToHigh'
              className={styles.radio}
              onChange={handleChange}
              checked={option === 'lowToHigh'}
            />
            Price low to high
          </label>
        </div>

        <div>
          <label>
            <input
              type='radio'
              id='highToLow'
              className={styles.radio}
              onChange={handleChange}
              checked={option === 'highToLow'}
            />
            Price high to low
          </label>
        </div>

        <div>
          <label>
            <input
              type='radio'
              id='newToOld'
              className={styles.radio}
              onChange={handleChange}
              checked={option === 'newToOld'}
            />
            New to old
          </label>
        </div>

        <div>
          <label>
            <input
              type='radio'
              id='oldToNew'
              className={styles.radio}
              onChange={handleChange}
              checked={option === 'oldToNew'}
            />
            Old to new
          </label>
        </div>
      </div>
    </>
  );
};

export default Sorting;
