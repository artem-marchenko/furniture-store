import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
  try {
    switch (action.type) {
      case SIDEBAR_OPEN:
        return { ...state, isSidebarOpen: true }

      case SIDEBAR_CLOSE:
        return { ...state, isSidebarOpen: false }

      case GET_PRODUCTS_BEGIN:
        return { ...state, products_loading: true }

      case GET_PRODUCTS_SUCCESS:
        return {
          ...state,
          products_loading: false,
          products: action.payload,
          featured_products: action.payload.filter(
            (product) => product.featured
          ),
        }

      case GET_PRODUCTS_ERROR:
        return { ...state, products_loading: false, products_error: true }

      case GET_SINGLE_PRODUCT_BEGIN:
        return {
          ...state,
          singleProduct_loading: true,
          singleProduct_error: false,
        }

      case GET_SINGLE_PRODUCT_SUCCESS:
        return {
          ...state,
          singleProduct_loading: false,
          singleProduct: action.payload,
        }

      case GET_SINGLE_PRODUCT_ERROR:
        return {
          ...state,
          singleProduct_loading: false,
          singleProduct_error: true,
        }
      default:
        return { ...state }
    }
  } catch (error) {
    throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default products_reducer
