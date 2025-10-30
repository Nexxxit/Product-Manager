import type {NewProduct, Product, UpdateProductInput} from "./types.ts";

const BASE = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

const USE_API_IN_DEV = import.meta.env.VITE_USE_API_IN_DEV === 'true';

export const productsApi = {
    getProducts: async (): Promise<Product[]> => {
        const response = await fetch(`${BASE}/products`)
        if (!response.ok) throw new Error('Не удалось загрузить список товаров')
        return response.json()
    },
    getProduct: async (id: number): Promise<Product> => {
        const response = await fetch(`${BASE}/products/${id}`)
        if (!response.ok) throw new Error('Не удалось загрузить товар')
        return response.json()
    },
    getCategories: async (): Promise<string[]> => {
        const response = await fetch(`${BASE}/products/categories`)
        if (!response.ok) throw new Error('Не удалось получить категории')
        return response.json()
    },
    addProduct: async (body: NewProduct): Promise<Product> => {
        const response = await fetch(`${BASE}/products`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        if (!response.ok) throw new Error('Не удалось добавить товар')
        return response.json()
    },
    updateProduct: async (patch: UpdateProductInput): Promise<Product> => {
        const response = await fetch(`${BASE}/products/${patch.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(patch)
        })
        if (!response.ok) throw new Error('Не удалось обновить товар')
        return response.json()
    },
    deleteProduct: async (id: number): Promise<number> => {
        const response = await fetch(`${BASE}/products/${id}`, {method: 'DELETE'})
        if (!response.ok) throw new Error('Не удалось удалить товар')
        return id
    }
}

export const USE_API_IN_DEV_FLAG = USE_API_IN_DEV;