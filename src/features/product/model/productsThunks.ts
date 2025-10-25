import {createAsyncThunk} from "@reduxjs/toolkit";
import {productsApi} from "./productsApi.ts";
import type {NewProduct, Product, UpdateProductInput} from "./types.ts";
import type {RootState} from "../../../app/store";

export const fetchProducts = createAsyncThunk<Product[]>(
    'product/fetchAll',
    async () => {
        if (import.meta.env.DEV) {
            const {mockProducts} = await import('./mocks.ts')
            return mockProducts
        }
        return productsApi.getProducts();
    })

export const fetchProductById = createAsyncThunk<Product, number>(
    'product/fetchById',
    async (id) => {
        if (import.meta.env.DEV) {
            const {mockProducts} = await import('./mocks.ts');
            const fromMocks = mockProducts.find(p => p.id === id);
            if (fromMocks) return fromMocks;
            throw new Error('Товар не найден в моках');
        }
        return productsApi.getProduct(id)
    },
    {
        condition: (id, {getState}) => {
            const state = getState() as RootState;
            return !state.product.entities[id];
        }
    })

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

export const addProduct = createAsyncThunk<Product, NewProduct>(
    'product/add',
    async (body) => {
        if (import.meta.env.DEV) {
            return {
                id: Math.floor(Math.random() * 1000000),
                rating: {rate: 0, count: 0},
                ...body
            }
        }
        return productsApi.addProduct(body)
    })

export const updateProduct = createAsyncThunk<Product, UpdateProductInput>(
    'product/update',
    async (patch, {getState}) => {
        const state = getState() as RootState;
        const existing = state.product.entities[patch.id];

        if (import.meta.env.DEV) {
            return {
                ...(existing ?? {
                    id: patch.id,
                    title: '',
                    price: '',
                    description: '',
                    category: '',
                    image: '',
                    rating: {rate: 0, count: 0}
                }),
                ...patch
            }
        }
        return productsApi.updateProduct(patch)
    }
)

export const deleteProduct = createAsyncThunk<number, number>(
    'product/delete',
    async (id) => {
        if (import.meta.env.DEV) return id;
        return productsApi.deleteProduct(id);
    })