import React, { useEffect, useMemo, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products';

import BrandsSearchingResults from './BrandsSearchingResults';

import styles from './Brands_Tags.module.css';

const Brands = () => {
  const { products, sortingOption } = useSelector((state) => state.products);
  const [brandFilters, setBrandFilters] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (brandFilters.length === 0) {
      setBrandFilters(['all']);
      dispatch(productActions.allBrands());
      dispatch(productActions.sortProducts(sortingOption));
    }
  }, [brandFilters]);

  let manuFacturersObj = {};

  manuFacturersObj = useMemo(() => {
    products.forEach((product) => {
      // if product is in the object, increase the quantity
      // else make the quantity of the product 1
      if (manuFacturersObj[product.manufacturer]) {
        manuFacturersObj = {
          ...manuFacturersObj,
          [product.manufacturer]: manuFacturersObj[product.manufacturer] + 1,
        };
      } else {
        manuFacturersObj = { ...manuFacturersObj, [product.manufacturer]: 1 };
      }
    });
    return manuFacturersObj;
  }, [products]);

  let manufacturers = [];

  manufacturers = useMemo(() => {
    for (let key in manuFacturersObj) {
      manufacturers.push({ name: key, quantity: manuFacturersObj[key] });
    }
    return manufacturers;
  }, [manuFacturersObj]);

  const handleChange = (e) => {
    if (e.target.id === 'all') {
      setBrandFilters(['all']);
      dispatch(productActions.allBrands());
      dispatch(productActions.sortProducts(sortingOption));
    } else {
      if (e.target.checked && e.target.id !== 'all') {
        setBrandFilters((prevFilters) => [...prevFilters, e.target.id]);
        setBrandFilters((prevFilters) =>
          prevFilters.filter((filt) => filt !== 'all')
        );
        dispatch(productActions.filterBrands(e.target.id, 'increase'));
        dispatch(productActions.combineBrandsWithTags());
        dispatch(productActions.sortProducts(sortingOption));
      } else {
        setBrandFilters((prevFilters) =>
          prevFilters.filter((filt) => filt !== e.target.id)
        );
        dispatch(productActions.filterBrands(e.target.id, 'decrease'));
        dispatch(productActions.combineBrandsWithTags());
        dispatch(productActions.sortProducts(sortingOption));
      }
    }
  };

  const inputChangeHandler = (text) => {
    let matches = [...manufacturers];
    if (text.length > 0) {
      matches = manufacturers.filter((item) => {
        const regex = new RegExp(`${text}`, 'gi');
        return item.name.match(regex);
      });
    }
    setSuggestions(matches);
    setSearchText(text);
  };

  return (
    <>
      <h4 className={styles.title}>Brands</h4>
      <div className={styles.RadioContainer}>
        <input
          type='text'
          placeholder='Search brand'
          value={searchText}
          onChange={(e) => inputChangeHandler(e.target.value)}
        />
        <div className={styles.inputContainer}>
          <label>
            <input
              type='checkbox'
              id='all'
              checked={brandFilters.includes('all')}
              onChange={handleChange}
            />
            All
            <span>({products.length})</span>
          </label>
        </div>
        <BrandsSearchingResults
          suggestions={suggestions}
          handleChange={handleChange}
          searchText={searchText}
          list={manufacturers}
          filters={brandFilters}
        />
      </div>
    </>
  );
};

export default Brands;
