import {StarFilled} from "../../../../shared/ui/icons/StarFilledIcon.tsx"
import {useAppSelector} from "../../../../app/store/hooks.ts";
import {selectProductById} from "../../model";
import './productCard.css'
import {memo, useCallback} from "react";

type ProductCardProps = {
    onItemClick: (id: number) => void;
    id: number;
}

const ProductCard = memo(({id, onItemClick}: ProductCardProps) => {
    const handleClick = useCallback(() => onItemClick(id), [onItemClick, id]);
    const product = useAppSelector(s => selectProductById(s, id))
    if (!product) return null

    return (
        <article className={'card'} onClick={handleClick}>
            <div className={'card__image-wrap'}>
                <img
                    className={'card__image'}
                    src={product.image}
                    alt={product.title}
                    width={320}
                    height={320}
                    loading={"lazy"}
                    decoding={"async"}
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
})

export default ProductCard

