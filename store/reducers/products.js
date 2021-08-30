import {
  SET_PRODUCTS,
  SORT_PRODUCTS,
  FILTER_BRANDS,
  FILTER_TAGS,
  COMBINE_BRANDS,
  COMBINE_TAGS,
  ALL_BRANDS,
  ALL_TAGS,
} from '../actions/products';

const initialState = {
  products: [],
  sortingOption: 'lowToHigh',
  filteredProducts: [],
  brandFilteredProducts: [],
  tagFilteredProducts: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
        filteredProducts: action.products,
      };

    case SORT_PRODUCTS:
      switch (action.sortingOption) {
        case 'lowToHigh':
          return {
            ...state,
            sortingOption: 'lowToHigh',
            filteredProducts: state.filteredProducts.sort(
              (a, b) => a.price - b.price
            ),
            products: state.products.sort((a, b) => a.price - b.price),
            brandFilteredProducts: state.brandFilteredProducts?.sort(
              (a, b) => a.price - b.price
            ),
            tagFilteredProducts: state.tagFilteredProducts?.sort(
              (a, b) => a.price - b.price
            ),
          };

        case 'highToLow':
          return {
            ...state,
            sortingOption: 'highToLow',
            filteredProducts: state.filteredProducts.sort(
              (a, b) => b.price - a.price
            ),
            products: state.products.sort((a, b) => b.price - a.price),
            brandFilteredProducts: state.brandFilteredProducts?.sort(
              (a, b) => b.price - a.price
            ),
            tagFilteredProducts: state.tagFilteredProducts?.sort(
              (a, b) => b.price - a.price
            ),
          };

        case 'newToOld':
          return {
            ...state,
            sortingOption: 'newToOld',
            filteredProducts: state.filteredProducts.sort(
              (a, b) => b.added - a.added
            ),
            products: state.products.sort((a, b) => b.added - a.added),
            brandFilteredProducts: state.brandFilteredProducts?.sort(
              (a, b) => b.added - a.added
            ),
            tagFilteredProducts: state.tagFilteredProducts?.sort(
              (a, b) => b.added - a.added
            ),
          };

        case 'oldToNew':
          return {
            ...state,
            sortingOption: 'oldToNew',
            filteredProducts: state.filteredProducts.sort(
              (a, b) => a.added - b.added
            ),
            products: state.products.sort((a, b) => a.added - b.added),
            brandFilteredProducts: state.brandFilteredProducts?.sort(
              (a, b) => a.added - b.added
            ),
            tagFilteredProducts: state.tagFilteredProducts?.sort(
              (a, b) => a.added - b.added
            ),
          };
      }

    case FILTER_BRANDS:
      switch (action.status) {
        case 'increase':
          return {
            ...state,
            brandFilteredProducts: [
              ...state.brandFilteredProducts,
              ...state.products.filter(
                (prod) => prod.manufacturer === action.brandFilter
              ),
            ],
          };
        case 'decrease':
          return {
            ...state,
            brandFilteredProducts: state.brandFilteredProducts.filter(
              (prod) => prod.manufacturer !== action.brandFilter
            ),
          };
      }

    case FILTER_TAGS:
      let updatedFilteredTags = [];
      action.tagFilters.forEach((tagFilter) => {
        // updatedFilteredTags.push(
        //   state.products.filter((prod) => prod.tags.includes(tagFilter))
        // );
        updatedFilteredTags = [
          ...updatedFilteredTags,
          ...state.products.filter((prod) => prod.tags.includes(tagFilter)),
        ];
      });
      return {
        ...state,
        tagFilteredProducts: updatedFilteredTags,
      };

    // Combine brand filtered items with the tag filtered items
    case COMBINE_BRANDS:
      return {
        ...state,
        filteredProducts: !!state.tagFilteredProducts.length
          ? state.brandFilteredProducts.filter((prod) =>
              state.tagFilteredProducts.some(
                (brdProd) => prod.id === brdProd.id
              )
            )
          : [...state.brandFilteredProducts],
      };

    // Combine tag filtered items with the brand filtered items
    case COMBINE_TAGS:
      return {
        ...state,
        filteredProducts: !!state.brandFilteredProducts.length
          ? state.brandFilteredProducts.filter((prod) =>
              state.tagFilteredProducts.some(
                (brdProd) => prod.id === brdProd.id
              )
            )
          : [...state.tagFilteredProducts],
      };

    //If tag filter is active and tag brand is "all"
    case ALL_BRANDS:
      return {
        ...state,
        filteredProducts: !!state.tagFilteredProducts.length
          ? state.tagFilteredProducts
          : state.products,
        brandFilteredProducts: [],
      };

    //If brand filter is active and tag filter is "all"
    case ALL_TAGS:
      return {
        ...state,
        filteredProducts: !!state.brandFilteredProducts.length
          ? state.brandFilteredProducts
          : state.products,
        tagFilteredProducts: [],
      };

    default: {
      return state;
    }
  }
};

export default productReducer;
