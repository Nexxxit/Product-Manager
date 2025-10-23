import Button from "../../../../shared/ui/Button/Button.tsx";
import {useAppDispatch, useAppSelector} from "../../../../app/store/hooks.ts";
import {resetSort, selectSort, setSort} from "../../model";
import {SortSolid} from "../../../../shared/ui/icons/SortSolidIcon.tsx";
import {useCallback, useRef, useState} from "react";
import './productSort.css'
import {useOnClickOutside} from "../../../../shared/hooks/useOnClickOutside.tsx";
import {useEscape} from "../../../../shared/hooks/useEscape.tsx";

const ProductSort = () => {
    const [isOpen, setOpen] = useState(false);
    const dispatch = useAppDispatch()
    const sort = useAppSelector(selectSort)

    const set = (by: 'price' | 'rating', order: 'asc' | 'desc') => {
        return dispatch(setSort({by, order}))
    }

    const menuRef = useRef<HTMLDivElement>(null);
    const close = useCallback(() => setOpen(false), []);
    useOnClickOutside(menuRef, close);
    useEscape(close);

    return (
        <div className={'products-sort'} ref={menuRef}>
            <Button className={'button--primary'} onClick={() => setOpen(isOpen => !isOpen)}>
                <SortSolid/>
            </Button>
            {isOpen && (
                <div className={'products-sort__panel'}>
                    <label className={'products-sort__sort-label'} htmlFor={'cheaper'}>
                        <input
                            className={'products-sort__sort-input'}
                            type={'radio'}
                            name={'sort'}
                            id={'cheaper'}
                            checked={sort?.by === 'price' && sort.order === 'asc'}
                            onChange={() => set('price', 'asc')}
                        />
                        Подешевле
                    </label>

                    <label className={'products-sort__sort-label'} htmlFor={'expensive'}>
                        <input
                            className={'products-sort__sort-input'}
                            type={'radio'}
                            name={'sort'}
                            id={'expensive'}
                            checked={sort?.by === 'price' && sort.order === 'desc'}
                            onChange={() => set('price', 'desc')}
                        />
                        Подороже
                    </label>

                    <label className={'products-sort__sort-label'} htmlFor={'highly rated'}>
                        <input
                            className={'products-sort__sort-input'}
                            type={'radio'}
                            name={'sort'}
                            id={'highly rated'}
                            checked={sort?.by === 'rating' && sort.order === 'desc'}
                            onChange={() => set('rating', 'desc')}
                        />
                        С высоким рейтингом
                    </label>

                    <label className={'products-sort__sort-label'} htmlFor={'low rated'}>
                        <input
                            className={'products-sort__sort-input'}
                            type={'radio'}
                            name={'sort'}
                            id={'low rated'}
                            checked={sort?.by === 'rating' && sort.order === 'asc'}
                            onChange={() => set('rating', 'asc')}
                        />
                        С низким рейтингом
                    </label>

                    <Button className={'button--danger'} onClick={() => dispatch(resetSort())}>
                        Сбросить
                    </Button>
                </div>
            )}
        </div>
    )
}

export default ProductSort