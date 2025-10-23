import Input from "../../../../shared/ui/Input/Input.tsx";
import {useAppDispatch, useAppSelector} from "../../../../app/store/hooks.ts";
import {addProduct, fetchCategories, type NewProduct, selectCategories} from "../../model";
import {useEffect, useState} from "react";
import './productForm.css'

type FieldsErrors = Partial<Record<'title' | 'price' | 'description' | 'image' | 'category', string>>
type ProductFormProps = { onSuccess?: () => void }

const ProductForm = ({onSuccess}: ProductFormProps) => {
    const [fieldsErrors, setFieldsErrors] = useState<FieldsErrors>({})
    const categories = useAppSelector(selectCategories)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch]);

    const clearErrors = (name: keyof FieldsErrors) => {
        if (fieldsErrors[name]) setFieldsErrors(prev => ({...prev, [name]: ''}))
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget);

        const title = String(fd.get('title') ?? '').trim();
        const priceStr = String(fd.get('price') ?? '').trim();
        const description = String(fd.get('description') ?? '').trim();
        const image = String(fd.get('image') ?? '').trim();
        const category = String(fd.get('category') ?? '').trim();

        const errors: FieldsErrors = {};

        if (!title) errors.title = 'Укажите заголовок';
        else if (title.length < 3) errors.title = 'Минимум 3 символа';

        if (!priceStr) errors.price = 'Укажите цену';
        else {
            const price = Number(priceStr);
            if (Number.isNaN(price)) errors.price = 'Цена должна быть числом';
            else if (price <= 0) errors.price = 'Цена должна быть больше 0';
        }

        if (!image) errors.image = 'Укажите ссылку на изображение';
        else {
            try {
                new URL(image)
            } catch {
                errors.image = 'Некорректный URL'
            }
        }

        if (!category) errors.category = 'Выберите категорию';

        if (description && description.length < 10) {
            errors.description = 'Введите минимум 10 символов или оставьте поле пустым';
        }

        const hasErrors = Object.values(errors).some(Boolean);
        if (hasErrors) {
            setFieldsErrors(errors);
            return;
        }

        const body: NewProduct = {
            title,
            price: Number(priceStr),
            description,
            category,
            image
        }

        const formEl = e.currentTarget;

        try {
            await dispatch(addProduct(body)).unwrap();
            formEl?.reset();
            setFieldsErrors({});
            onSuccess?.();
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className={'product-form'} id={'product-add-form'} onSubmit={handleSubmit} noValidate>
            <div className={'field'}>
                <label htmlFor={'title'} className={'field__label'}>Заголовок</label>
                <Input
                    className={`input ${fieldsErrors.title ? 'is-invalid' : ''}`}
                    onChange={() => clearErrors('title')}
                    name={'title'}
                    id={'title'}
                    placeholder={'Футболка хлопковая'}
                    required
                />
                {fieldsErrors.title ? (<span className={'field__error'}>{fieldsErrors.title}</span>) : ''}
            </div>

            <div className={'field'}>
                <label htmlFor={'price'} className={'field__label'}>Цена</label>
                <Input
                    className={`input ${fieldsErrors.price ? 'is-invalid' : ''}`}
                    onChange={() => clearErrors('price')}
                    name={'price'}
                    id={'price'}
                    type={"number"}
                    placeholder={'1999'}
                    required
                />
                {fieldsErrors.price ? (<span className={'field__error'}>{fieldsErrors.price}</span>) : ''}
            </div>


            <div className={'field'}>
                <label htmlFor={'description'} className={'field__label'}>Описание</label>
                <textarea
                    className={`input ${fieldsErrors.description ? 'is-invalid' : ''}`}
                    onChange={() => clearErrors('description')}
                    name={'description'}
                    id={'description'}
                    placeholder={'Описание товара'}
                />
                {fieldsErrors.description ? (
                    <span className={'field__error'}>{fieldsErrors.description}</span>) : ''
                }
            </div>

            <div className={'field'}>
                <label htmlFor={'image'} className={'field__label'}>Ссылка на изображение</label>
                <Input
                    className={fieldsErrors.image ? 'is-invalid' : ''}
                    onChange={() => clearErrors('image')}
                    name={'image'}
                    id={'image'}
                    placeholder={'URL'}
                    required/>
                {fieldsErrors.image ? (<span className={'field__error'}>{fieldsErrors.image}</span>) : ''}
            </div>

            <div className={'field'}>
                <label className={'field__label'}>Категория</label>
                <select
                    className={`input ${fieldsErrors.category ? 'is-invalid' : ''}`}
                    onChange={() => clearErrors('category')}
                    name={'category'}
                    required
                    defaultValue={""}
                >
                    {categories.map(c => (
                        <option key={c}>{c}</option>
                    ))}
                </select>
                {fieldsErrors.category ? (<span className={'field__error'}>{fieldsErrors.category}</span>) : ''}
            </div>
        </form>
    )
}

export default ProductForm