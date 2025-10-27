import Button from "../../../../shared/ui/Button/Button.tsx";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks.ts";
import { resetSort, selectSort, setSort, selectTotalProducts } from "../../model";
import { SortSolid } from "../../../../shared/ui/icons/SortSolidIcon.tsx";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import './productSort.css'
import { useOnClickOutside } from "../../../../shared/hooks/useOnClickOutside.tsx";
import { useEscape } from "../../../../shared/hooks/useEscape.tsx";

const SortToggleButton = memo(({ onClick, disabled }: { onClick: () => void; disabled: boolean; }) => {
    return (
        <Button className={'button--primary'} onClick={onClick} disabled={disabled}>
            <SortSolid />
        </Button>
    )
})

const ResetSortButton = memo(({ onClick }: { onClick: () => void; }) => {
    return (
        <Button className={'button--danger'} onClick={onClick}>
            Сбросить
        </Button>
    )
})

const ProductSort = memo(() => {
    const [isOpen, setOpen] = useState(false);
    const dispatch = useAppDispatch()
    const sort = useAppSelector(selectSort)
    const total = useAppSelector(selectTotalProducts)
    const isDisabled = total === 0

    const set = (by: 'price' | 'rating', order: 'asc' | 'desc') => {
        return dispatch(setSort({ by, order }))
    }

    const menuRef = useRef<HTMLDivElement>(null);
    const close = useCallback(() => setOpen(false), []);
    useOnClickOutside(menuRef, close);
    useEscape(close);

    useEffect(() => {
        if (isDisabled) setOpen(false);
    }, [isDisabled]);

    const toggle = useCallback(() => {
        if (!isDisabled) setOpen(isOpen => !isOpen)
    }, [isDisabled])

    const onReset = useCallback(() => dispatch(resetSort()), [dispatch]);

    return (
        <div className={'products-sort'} ref={menuRef}>
            <SortToggleButton onClick={toggle} disabled={isDisabled} />
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

                    <ResetSortButton onClick={onReset} />
                </div>
            )}
        </div>
    )
})

export default ProductSort