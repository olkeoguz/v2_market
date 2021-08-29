import React from 'react';
import styles from './Brands_Tags.module.css';

const TagsSearchingResults = ({
  suggestions,
  handleChange,
  searchText,
  tags,
  products,
  filters,
}) => {
  let listItems;

  if (searchText.length === 0) {
    listItems = tags.map((tag, index) => (
      <div key={index} className={styles.inputContainer}>
        <label>
          <input
            type='checkbox'
            id={tag}
            checked={filters.includes(tag)}
            onChange={handleChange}
          />
          {tag}
          <span>
            ({products.filter((prod) => prod.tags.includes(`${tag}`)).length})
          </span>
        </label>
      </div>
    ));
  }
  // Searching and no suggestions
  else if (searchText.length > 0 && !suggestions.length > 0) {
    listItems = (
      <div>
        <h5>Tag not found!</h5>
      </div>
    );
  }
  // Searching and items found
  else if (suggestions.length > 0) {
    listItems = suggestions.map((tag, index) => (
      <div key={index} className={styles.inputContainer}>
        <label>
          <input
            type='checkbox'
            id={tag}
            checked={filters.includes(tag)}
            onChange={handleChange}
          />
          {tag}
          <span>
            ({products.filter((prod) => prod.tags.includes(`${tag}`)).length})
          </span>
        </label>
      </div>
    ));
  }

  return <>{listItems}</>;
};

export default TagsSearchingResults;
