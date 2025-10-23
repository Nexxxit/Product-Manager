export {
    default as productReducer,
    setSort,
    resetSort,
    selectIsAdding,
    selectSort,
    selectSortedProducts,
    selectCategories,
    selectStatus,
    selectAllProducts,
    selectProductById
} from "./slice"

export {
    fetchCategories,
    fetchProducts,
    deleteProduct,
    updateProduct,
    addProduct
} from "./productsThunks.ts"

export * from "./types.ts"