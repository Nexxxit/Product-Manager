import {StarFilled} from "../../../../shared/ui/icons/StarFilledIcon.tsx"
import {useAppSelector} from "../../../../app/store/hooks.ts";
import {selectProductById} from "../../model";
import './productCard.css'

const ProductCard = ({id}: { id: number }) => {
    const product = useAppSelector(s => selectProductById(s, id))
    if (!product) return null

    return (
        <article className={'card'}>
            <div className={'card__image-wrap'}>
                <img className={'card__image-bg'} src={product.image} alt={""} aria-hidden={"true"} loading={"lazy"} />
                <img
                    className={'card__image'}
                    src={product.image}
                    alt={product.title}
                    loading={"lazy"}
                />
            </div>

            <div className={'card__content'}>
                <span className={'card__price'}>{product.price}</span>
                <h3 className={'card__title'}>{product.title}</h3>
                <span className={'card__category'}>{product.category}</span>
            </div>
            <div className={'card__rating'}>
                <span className={'card__rating-icon'}><StarFilled/></span>
                <span className={'card__rating-value'}>{product.rating?.rate ?? 0}</span>
            </div>
        </article>
    )
}

export default ProductCard

