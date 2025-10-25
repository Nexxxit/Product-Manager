import './productDetail.css'
import {useAppDispatch, useAppSelector} from "../../../../app/store/hooks.ts";
import {selectProductById} from "../../model";
import {useEffect} from "react";
import {fetchProductById} from "../../model/productsThunks.ts";
import Spinner from "../../../../shared/ui/Spinner/Spinner.tsx";
import {StarFilled} from "../../../../shared/ui/icons/StarFilledIcon.tsx";
import ProductForm from "../productForm/ProductForm.tsx";

type ProductDetailProps = {
    id: number;
    editMode: boolean;
    onEditSuccess?: () => void;
}

const ProductDetail = ({id, editMode, onEditSuccess}: ProductDetailProps) => {
    const dispatch = useAppDispatch()
    const product = useAppSelector(s => selectProductById(s, id));

    useEffect(() => {
        if (!product) {
            dispatch(fetchProductById(id))
        }
    }, [dispatch, id, product]);

    if (!product) {
        return (
            <div className={'loading'}>
                <Spinner/>
                <span className={'loading__text'}>Загружаю товар...</span>
            </div>
        )
    }

    return (
        <>
            {editMode ? (
                <ProductForm
                    key={`edit-${id}`}
                    formId={'product-edit-form'}
                    mode={'edit'}
                    initial={product}
                    onSuccess={onEditSuccess}
                />
            ) : (
                <div className={'product-detail'}>
                    <div className={'product-detail__image-wrap'}>
                        <img className={'product-detail__image'} src={product.image} alt={product.title}/>
                    </div>

                    <div className={'product-detail__content'}>
                        <div className={'product-detail__field'}>
                            <span className={'product-detail__label'}>Заголовок</span>
                            <h3 className={'product-detail__title'}>{product.title}</h3>
                        </div>

                        <div className={'product-detail__field'}>
                            <span className={'product-detail__label'}>Цена</span>
                            <span className={'product-detail__price'}>{product.price}</span>
                        </div>

                        <div className={'product-detail__field'}>
                            <span className={'product-detail__label'}>Категория</span>
                            <span className={'product-detail__category'}>{product.category}</span>
                        </div>

                        <div className={'product-detail__field'}>
                            <span className={'product-detail__label'}>Описание</span>
                            {product.description ? (
                                <span className={'product-detail__description'}>{product.description}</span>
                            ) : (
                                <span className={'product-detail__description-non'}>Описание отсутствует</span>
                            )}
                        </div>
                    </div>

                    <div className={'product-detail__rating'}>
                        <span className={'product-detail__rating-icon'}>{<StarFilled/>}</span>
                        <span className={'product-detail__rating-value'}>{product.rating?.rate ?? 0}</span>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default ProductDetail