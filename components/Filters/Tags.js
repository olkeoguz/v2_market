import React, { useMemo, useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products';

import TagsSearchingResults from './TagSearchingResults';

import styles from './Brands_Tags.module.css';

const Tags = () => {
  const { products, sortingOption } = useSelector((state) => state.products);
  const [tagFilters, setTagFilters] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (tagFilters.length === 0) {
      setTagFilters(['all']);
      dispatch(productActions.allTags());
      dispatch(productActions.sortProducts(sortingOption));
    }
  }, [tagFilters]);

  let tagsSet = new Set();

  tagsSet = useMemo(() => {
    for (let product of products) {
      for (let tag of product.tags) {
        tagsSet.add(tag);
      }
    }
    return tagsSet;
  }, [products]);
  const tags = useMemo(() => [...tagsSet], [tagsSet]);

  const handleChange = (e) => {
    if (e.target.id === 'all') {
      setTagFilters(['all']);
      dispatch(productActions.allTags());
      dispatch(productActions.sortProducts(sortingOption));
    } else {
      if (e.target.checked && e.target.id !== 'all') {
        setTagFilters((prevFilters) => [...prevFilters, e.target.id]);
        setTagFilters((prevFilters) =>
          prevFilters.filter((filt) => filt !== 'all')
        );
        dispatch(productActions.filterTags(e.target.id, 'increase'));
        dispatch(productActions.combineTagsWithBrands());
        dispatch(productActions.sortProducts(sortingOption));
      } else {
        setTagFilters((prevFilters) =>
          prevFilters.filter((filt) => filt !== e.target.id)
        );
        dispatch(productActions.filterTags(e.target.id, 'decrease'));
        dispatch(productActions.combineTagsWithBrands());
        dispatch(productActions.sortProducts(sortingOption));
      }
    }
  };

  const inputChangeHandler = (text) => {
    let matches = [...tags];
    if (text.length > 0) {
      matches = tags.filter((item) => {
        const regex = new RegExp(`${text}`, 'gi');
        return item.match(regex);
      });
    }
    setSuggestions(matches);
    setSearchText(text);
  };

  return (
    <>
      <h4 className={styles.title}>Tags</h4>
      <div className={styles.RadioContainer}>
        <input
          type='text'
          placeholder='Search tag'
          value={searchText}
          onChange={(e) => inputChangeHandler(e.target.value)}
        />
        <div className={styles.inputContainer}>
          <label>
            <input
              type='checkbox'
              id='all'
              checked={tagFilters.includes('all')}
              onChange={handleChange}
            />
            All
          </label>
          <span>({products.length})</span>
        </div>
        <TagsSearchingResults
          suggestions={suggestions}
          handleChange={handleChange}
          searchText={searchText}
          tags={tags}
          products={products}
          filters={tagFilters}
        />
      </div>
    </>
  );
};

export default Tags;
