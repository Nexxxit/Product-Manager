import ProductList from "../features/product/ui/productList/ProductList.tsx";
import ProductSort from "../features/product/ui/productSort/productSort.tsx";
import ProductForm from "../features/product/ui/productForm/ProductForm.tsx";
import {useState} from "react";
import Modal from "../shared/ui/Modal/Modal.tsx";
import Button from "../shared/ui/Button/Button.tsx";
import {useAppDispatch, useAppSelector} from "./store/hooks.ts";
import {deleteProduct, selectIsAdding, selectIsEditing} from "../features/product/model";
import Spinner from "../shared/ui/Spinner/Spinner.tsx";
import ProductDetail from "../features/product/ui/productDetail/ProductDetail.tsx";
import {CloseOutlined} from "../shared/ui/icons/CloseOutlinedIcon.tsx";

function App() {
    const [isProductFormOpen, setProductFormOpen] = useState(false);
    const [productId, setProductId] = useState<number | null>(null);
    const [editMode, setEditMode] = useState(false);
    const dispatch = useAppDispatch()
    const isAdding = useAppSelector(selectIsAdding);
    const isEditing = useAppSelector(selectIsEditing);

    const handleDeleteProduct = () => {
        if (productId !== null) {
            dispatch(deleteProduct(productId));
            setProductId(null);
        }
    }

    return (
        <div className={'container'}>
            <div className={'header'}>
                <Button onClick={() => setProductFormOpen(true)}>
                    Добавить товар
                </Button>
                <ProductSort/>
            </div>
            <ProductList onItemClick={(id) => {
                setProductId(id);
                setEditMode(false)
            }}/>

            <Modal open={isProductFormOpen} onClose={() => setProductFormOpen(false)} aria-label={'product-form'}>
                <Modal.Header>
                    <h3>Новый товар</h3>
                </Modal.Header>
                <Modal.Body>
                    {isProductFormOpen && (
                        <ProductForm formId={'product-add-form'} onSuccess={() => setProductFormOpen(false)}/>)}
                </Modal.Body>
                <Modal.Footer>
                    <Button className={'button--primary'} type={'submit'} form={'product-add-form'}
                            disabled={isAdding}>{isAdding
                        ? (<span>Добавляю... <Spinner className={'spinner-sm'}/></span>)
                        : ('Добавить')
                    }</Button>
                    <Button onClick={() => setProductFormOpen(false)} disabled={isAdding}>Отмена</Button>
                </Modal.Footer>
            </Modal>

            <Modal open={productId !== null} onClose={() => {
                setProductId(null);
            }} aria-label={'product-details'}>
                <Modal.Header className={'modal__header--flex'}>
                    <h3>Детали товара</h3>
                    <Button onClick={() => setProductId(null)} disabled={isEditing}><CloseOutlined/></Button>
                </Modal.Header>
                <Modal.Body>
                    {productId !== null
                        ? <ProductDetail
                            id={productId}
                            editMode={editMode}
                            onEditSuccess={() => setEditMode(false)}/>
                        : null}
                </Modal.Body>
                <Modal.Footer>
                    {editMode ? (
                        <>
                            <Button onClick={() => setEditMode(false)} disabled={isEditing}>Отмена</Button>
                            <Button
                                className={'button--primary'}
                                type={'submit'}
                                form={'product-edit-form'}
                                disabled={isEditing}
                            >
                                {isEditing
                                    ? (<span>Редактирую... <Spinner className={'spinner-sm'}/></span>)
                                    : ('Подтвердить')
                                }
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button className={'button--danger'} onClick={handleDeleteProduct}>Удалить</Button>
                            <Button className={'button--primary'}
                                    onClick={() => requestAnimationFrame(() => setEditMode(true))}
                            >
                                Редактировать
                            </Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default App
