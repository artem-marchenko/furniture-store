import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price)
      maxPrice = Math.max(...maxPrice)
      return {
        ...state,
        all_products: [...action.payload],
        filter_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      }

    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      }

    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      }

    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      }

    case SORT_PRODUCTS: {
      const { sort, filter_products } = state
      let tempProducts = [...filter_products]
      if (sort === 'price-lowest') {
        tempProducts.sort((a, b) => {
          return a.price - b.price
        })
      }
      if (sort === 'price-highest') {
        tempProducts.sort((a, b) => {
          return b.price - a.price
        })
      }
      if (sort === 'name-az') {
        tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      }
      if (sort === 'name-za') {
        tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name)
        })
      }
      return {
        ...state,
        filter_products: tempProducts,
      }
    }

    case UPDATE_FILTERS:
      const { name, value } = action.payload
      return {
        ...state,
        filters: { ...state.filters, [name]: value },
      }

    case FILTER_PRODUCTS:
      const { all_products } = state
      let tempProducts = [...all_products]

      const { text, category, company, color, price, shipping } = state.filters

      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text)
        })
      }

      if (category !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        )
      }

      if (company !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.company === company
        })
      }

      if (color !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          console.log(product.colors, color)
          return product.colors.find((c) => c === color)
        })
      }

      tempProducts = tempProducts.filter((product) => product.price <= price)

      if (shipping) {
        tempProducts = tempProducts.filter((product) => {
          return product.shipping === shipping
        })
      }
      return {
        ...state,
        filter_products: tempProducts,
      }

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          category: 'all',
          company: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      }
    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default filter_reducer
