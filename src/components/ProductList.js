import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const { filter_products, grid_view, list_view } = useFilterContext()

  if (filter_products.length < 1) {
    return <h5>no found products</h5>
  }

  if (grid_view === false) {
    return <ListView filter_products={filter_products} />
  }

  return <GridView filter_products={filter_products} />
}

export default ProductList
