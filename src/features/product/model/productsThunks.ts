import {createAsyncThunk} from "@reduxjs/toolkit";
import {productsApi} from "./productsApi.ts";
import type {NewProduct, Product} from "./types.ts";

export const fetchProducts = createAsyncThunk<Product[]>('product/fetchAll', productsApi.getProducts)
export const fetchProductById = createAsyncThunk<Product, number>('product/fetchById', productsApi.getProduct)

export const fetchCategories = createAsyncThunk<string[]>(
    'product/fetchCategories',
    async () => {
        if (import.meta.env.DEV) {
            const {mockCategories} = await import('./mocks.ts');
            return mockCategories;
        }
        return productsApi.getCategories()
    }
    )


export const addProduct = createAsyncThunk<Product, NewProduct>('product/add', productsApi.addProduct)
export const updateProduct = createAsyncThunk<Product, Partial<Product> & Pick<Product, 'id'>>(
    'product/update', productsApi.updateProduct
)
export const deleteProduct = createAsyncThunk<number, number>('product/delete', productsApi.deleteProduct)