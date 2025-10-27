import {createSlice, createEntityAdapter, type PayloadAction, createSelector} from "@reduxjs/toolkit";
import type {Product} from "./types.ts";
import type {RootState} from "../../../app/store";
import {
    fetchProducts,
    fetchProductById,
    fetchCategories,
    addProduct,
    deleteProduct,
    updateProduct
} from "./productsThunks.ts";

const adapter = createEntityAdapter<Product>()

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';
type SortBy = 'price' | 'rating';
type SortOrder = 'asc' | 'desc';
type ExtraState = {
    status: Status;
    error: string | null;
    sort: { by: SortBy; order: SortOrder } | null;
    categories: string[];
    creating: boolean;
    editing: boolean;
}

const initial: ReturnType<typeof adapter.getInitialState> & ExtraState =
    adapter.getInitialState({
        status: 'idle',
        error: null,
        sort: null,
        categories: [],
        creating: false,
        editing: false,
    })

const productSlice = createSlice({
    name: 'product',
    initialState: initial,
    reducers: {
        setSort(state, action: PayloadAction<{ by: SortBy; order: SortOrder }>) {
            state.sort = action.payload
        },
        resetSort(state) {
            state.sort = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (s) => {
                s.status = 'loading';
                s.error = null
            })
            .addCase(fetchProducts.fulfilled, (s, a) => {
                s.status = 'succeeded';
                adapter.setAll(s, a.payload)
            })
            .addCase(fetchProducts.rejected, (s, a) => {
                s.status = 'failed';
                s.error = a.error.message || 'Ошибка'
            })
            .addCase(fetchProductById.fulfilled, (s, a) => {
                adapter.setOne(s, a.payload)
            })
            .addCase(addProduct.pending, (s) => {
                s.creating = true
            })
            .addCase(addProduct.fulfilled, (s, a) => {
                s.creating = false
                adapter.addOne(s, a.payload)
            })
            .addCase(addProduct.rejected, (s, a) => {
                s.creating = false
                s.error = a.error.message || 'Ошибка'
            })
            .addCase(updateProduct.pending, (s) => {
                s.editing = true
            })
            .addCase(updateProduct.rejected, (s, a) => {
                s.editing = false
                s.error = a.error.message || 'Ошибка'
            })
            .addCase(updateProduct.fulfilled, (s, a) => {
                s.editing = false
                adapter.upsertOne(s, a.payload)
            })
            .addCase(deleteProduct.fulfilled, (s, a) => {
                adapter.removeOne(s, a.payload)
            })
            .addCase(fetchCategories.fulfilled, (s, a) => {
                s.categories = a.payload
            })
    }
})

export const {setSort, resetSort} = productSlice.actions
export default productSlice.reducer

const selectors = adapter.getSelectors<RootState>((s) => s.product)
export const selectAllProducts = selectors.selectAll
export const selectProductById = selectors.selectById
export const selectStatus = (s: RootState) => s.product.status
export const selectCategories = (s: RootState) => s.product.categories
export const selectSort = (s: RootState) => s.product.sort
export const selectIsAdding = (s: RootState) => s.product.creating
export const selectIsEditing = (s: RootState) => s.product.editing
export const selectTotalProducts = selectors.selectTotal

export const selectSortedProducts = createSelector([selectAllProducts, selectSort], (items, sort) => {
    if (!sort) return items
    const arr = [...items]
    arr.sort((a, b) => {
        const av = sort.by === 'price' ? a.price : a.rating?.rate ?? 0
        const bv = sort.by === 'price' ? b.price : b.rating?.rate ?? 0
        return sort.order === 'asc' ? av - bv : bv - av
    })
    return arr
})