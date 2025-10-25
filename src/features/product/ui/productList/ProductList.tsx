import {useAppSelector, useAppDispatch} from "../../../../app/store/hooks.ts";
import {fetchProducts, selectSortedProducts, selectStatus} from "../../model";
import {useEffect} from "react";
import ProductCard from "../productCard/ProductCard.tsx";
import Spinner from "../../../../shared/ui/Spinner/Spinner.tsx";
import './productList.css'

type ProductListProps = {
    onItemClick: (id: number) => void;
}

const ProductList = ({onItemClick}: ProductListProps) => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(selectStatus)
    const products = useAppSelector(selectSortedProducts)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts())
        }
    }, [dispatch, status]);

    if (status === 'loading') return (
        <div className={'loading'}>
            <span className={'loading__text'}>Загружаю товары...</span>
            <Spinner/>
        </div>
    )

    return (
        <div className={'products-list'}>
            {products.length > 0
                ? (products.map(p => <ProductCard key={p.id} id={p.id} onClick={() => onItemClick(p.id)}/>))
                : (<div className={'products-list__empty'}>Товаров не найдено</div>)}
        </div>
    )
}

export default ProductList