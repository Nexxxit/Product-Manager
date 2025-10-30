import {useAppSelector, useAppDispatch} from "../../../../app/store/hooks.ts";
import {fetchProducts, selectSortedProducts, selectStatus, selectTotalProducts} from "../../model";
import {memo, useEffect} from "react";
import ProductCard from "../productCard/ProductCard.tsx";
import Spinner from "../../../../shared/ui/Spinner/Spinner.tsx";
import './productList.css'

type ProductListProps = {
    onItemClick: (id: number) => void;
}

const ProductList = memo(({onItemClick}: ProductListProps) => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(selectStatus)
    const products = useAppSelector(selectSortedProducts)
    const totalProducts = useAppSelector(selectTotalProducts)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts())
        }
    }, [dispatch, status]);

    if (status === 'loading') {
        return (
            <div className={'loading'}>
                <span className={'loading__text'}>Загружаю товары...</span>
                <Spinner/>
            </div>
        )
    }

    if (totalProducts === 0) {
        return <div className={'products-list__empty'}>Товаров не найдено</div>
    }

    return (
        <div className={'products-list'}>
            {products.map((product) => (
                <ProductCard key={product.id} id={product.id} onItemClick={onItemClick}/>
            ))}
        </div>
    )
})

export default ProductList