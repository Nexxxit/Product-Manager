import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
}

let products: Product[] = [
    {
        id: 1,
        title: 'Mock Shirt Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis nat',
        price: 2999,
        description: 'Футболка белая',
        category: 'clothes',
        image: 'https://n.cdn.cdek.shopping/images/shopping/FHRzN2W9USHAZWEt.jpg?v=1',
        rating: {rate: 4.5, count: 120}
    },
    {
        id: 2,
        title: 'Mock Phone',
        price: 79990,
        description: 'Телефон',
        category: 'electronics',
        image: 'https://tula.stores-apple.com/upload/blog/comment/titles/24-07-2025/158_iphone_15_for_students_24_07_6.png',
        rating: {rate: 4.7, count: 320}
    },
    {
        id: 3,
        title: 'Mock Phone',
        price: 79990,
        description: 'Телефон',
        category: 'electronics',
        image: 'https://kotofoto.ru/product_img/2419/621412/621412_mobilniy_telefon_texet_tm_117_cherniy_1.jpg?v=1691276612',
        rating: {rate: 4.7, count: 320}
    },
    {
        id: 4,
        title: 'Mock Shirt',
        price: 2999,
        description: 'Футболка белая',
        category: 'clothes',
        image: 'https://n.cdn.cdek.shopping/images/shopping/FHRzN2W9USHAZWEt.jpg?v=1',
        rating: {rate: 4.5, count: 120}
    },
]
const categories = [
    'clothes',
    'electronics',
    'jewelery',
    'home',
    'sports',
    'books',
    'toys',
    'beauty',
    'groceries',
    'automotive',]
let nextId = 5;

app.get('/api/products', (_req, res) => res.json(products))

app.get('/api/products/categories', (_req, res) => res.json(categories));

app.get('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) return res.status(404).json({message: 'Not Found'});
    res.json(product)
})

app.post('/api/products', (req, res) => {
    const {title, price, description, image, category} = req.body as Omit<Product, 'id' | 'rating'>;
    if (!title || price == null || !category || !image) {
        return res.status(400).json({message: 'title, price, category, image as required'});
    }
    const product: Product = {id: nextId++, title, price, description, image, category, rating: {rate: 0, count: 0} };
    products.push(product);
    res.status(201).json(product);
})

app.put('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const prev = products.find(p => p.id === id);
    if(!prev) return res.status(404).json({message: 'Not Found'});

    const {title, price, description, image, category} = req.body as Partial<Product>;

    const updated: Product = {
        ...prev,
        title: title ?? prev.title,
        price: price ?? prev.price,
        description: description ?? prev.description,
        image: image ?? prev.image,
        category: category ?? prev.category,
        id: prev.id,
        rating: prev.rating,
    };
    products = products.map(p => (p.id === id ? updated : p));
    return res.json(updated);
})

app.delete('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ message: 'Not found' });
    products.splice(idx, 1)
    res.json({ id });
});

const CLIENT_DIST = path.resolve(__dirname, '../../frontend/dist');
app.use(express.static(CLIENT_DIST));

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));