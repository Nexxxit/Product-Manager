import {useAppSelector, useAppDispatch} from "../../../../app/store/hooks.ts";
import {fetchProducts, selectAllProducts, selectStatus} from "../../model";
import {useEffect} from "react";
import ProductCard from "../productCard/ProductCard.tsx";
import {hydrate} from "../../model/slice.ts";
import {mockProducts} from "../../model/mocks.ts";
import Spinner from "../../../../shared/ui/Spinner/Spinner.tsx";
import './productList.css'

const ProductList = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(selectStatus)
    const products = useAppSelector(selectAllProducts)

    useEffect(() => {
        dispatch(hydrate(mockProducts))
    }, [dispatch]);

    // useEffect(() => {
    //     if (status === 'idle') dispatch(fetchProducts())
    // }, [status, dispatch]);

    if (status === 'loading') return (
        <div className={'loading'}>
            <span className={'loading__text'}>Загружаю товары...</span>
            <Spinner/>
        </div>
    )

    return (
        <div className={'products-list'}>
            {products.map(p => <ProductCard key={p.id} id={p.id}/>)}
        </div>
    )
}

export default ProductList