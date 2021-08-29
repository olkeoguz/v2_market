export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SORT_PRODUCTS = 'SORT_PRODUCTS';
export const FILTER_BRANDS = 'FILTER_BRANDS';
export const FILTER_TAGS = 'FILTER_TAGS';
export const COMBINE_BRANDS = 'COMBINE_BRANDS';
export const COMBINE_TAGS = 'COMBINE_TAGS';
export const ALL_BRANDS = 'ALL_BRANDS';
export const ALL_TAGS = 'ALL_TAGS';

export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const sortProducts = (sortingOption) => {
  return {
    type: SORT_PRODUCTS,
    sortingOption,
  };
};

export const filterBrands = (brandFilter, status) => {
  return {
    type: FILTER_BRANDS,
    brandFilter,
    status,
  };
};

export const combineBrandsWithTags = () => {
  return {
    type: COMBINE_BRANDS,
  };
};

export const allBrands = () => {
  return {
    type: ALL_BRANDS,
  };
};

export const combineTagsWithBrands = () => {
  return {
    type: COMBINE_TAGS,
  };
};

export const filterTags = (tagFilter, status) => {
  return {
    type: FILTER_TAGS,
    tagFilter,
    status,
  };
};

export const allTags = () => {
  return {
    type: ALL_TAGS,
  };
};
