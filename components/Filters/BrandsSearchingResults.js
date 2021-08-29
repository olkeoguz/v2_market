import React from 'react';
import styles from './Brands_Tags.module.css';

const BrandsSearchingResults = ({
  suggestions,
  handleChange,
  searchText,
  list,
  filters,
}) => {
  let listItems;

  if (searchText.length === 0) {
    listItems = list.map((manu, index) => (
      <div key={index} className={styles.inputContainer}>
        <label>
          <input
            type='checkbox'
            id={manu.name}
            checked={filters.includes(manu.name)}
            onChange={handleChange}
          />
          {manu.name}
          <span>({manu.quantity})</span>
        </label>
      </div>
    ));
  }
  // Searching and no suggestions
  else if (searchText.length > 0 && !suggestions.length > 0) {
    listItems = (
      <div>
        <h5>Brand not found!</h5>
      </div>
    );
  }
  // Searching and items found
  else if (suggestions.length > 0) {
    listItems = suggestions.map((manu, index) => (
      <div key={index} className={styles.inputContainer}>
        <label>
          <input
            type='checkbox'
            id={manu.name}
            checked={filters.includes(manu.name)}
            onChange={handleChange}
          />
          {manu.name}
          <span>({manu.quantity})</span>
        </label>
      </div>
    ));
  }

  return <>{listItems}</>;
};

export default BrandsSearchingResults;
