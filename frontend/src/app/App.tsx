import ProductList from "../features/product/ui/productList/ProductList.tsx";
import ProductSort from "../features/product/ui/productSort/productSort.tsx";
import ProductForm from "../features/product/ui/productForm/ProductForm.tsx";
import {memo, useCallback, useState} from "react";
import Modal from "../shared/ui/Modal/Modal.tsx";
import Button from "../shared/ui/Button/Button.tsx";
import {useAppDispatch, useAppSelector} from "./store/hooks.ts";
import {deleteProduct, selectIsAdding, selectIsEditing} from "../features/product/model";
import Spinner from "../shared/ui/Spinner/Spinner.tsx";
import ProductDetail from "../features/product/ui/productDetail/ProductDetail.tsx";
import {CloseOutlined} from "../shared/ui/icons/CloseOutlinedIcon.tsx";

type DetailFooterProps = {
    editMode: boolean;
    onCancelEdit: () => void;
    onConfirmEditFormId: string;
    onDelete: () => void;
    onRequestEdit: () => void;
}

const AddFooterButtons = memo(({onCancel}: { onCancel: () => void }) => {
    const isAdding = useAppSelector(selectIsAdding);
    return (
        <>
            <Button onClick={onCancel} disabled={isAdding}>Отмена</Button>
            <Button className={'button--primary'} type={'submit'} form={'product-add-form'} disabled={isAdding}>
                {isAdding ? (<span>Добавляю... <Spinner className={'spinner-sm'}/></span>) : ('Добавить')}
            </Button>
        </>
    )
})

const DetailCloseButton = memo(({onClose}: { onClose: () => void }) => {
    const isEditing = useAppSelector(selectIsEditing);
    return <Button onClick={onClose} disabled={isEditing}><CloseOutlined/></Button>
})

const DetailFooter = ({
                          editMode,
                          onCancelEdit,
                          onConfirmEditFormId,
                          onDelete,
                          onRequestEdit,
                      }: DetailFooterProps) => {
    const isEditing = useAppSelector(selectIsEditing);

    if (editMode) {
        return (
            <>
                <Button onClick={onCancelEdit} disabled={isEditing}>Отмена</Button>
                <Button
                    className={'button--primary'}
                    type={'submit'}
                    form={onConfirmEditFormId}
                    disabled={isEditing}
                >
                    {isEditing
                        ? (<span>Редактирую... <Spinner className={'spinner-sm'}/></span>)
                        : ('Подтвердить')
                    }
                </Button>
            </>
        )
    }

    return (
        <>
            <Button className={'button--danger'} onClick={onDelete}>Удалить</Button>
            <Button className={'button--primary'} onClick={onRequestEdit}>Редактировать</Button>
        </>
    )


}

const AppHeader = memo(({onOpenForm}: {onOpenForm: () => void}) => {
    return (
        <div className={'header'}>
            <Button onClick={onOpenForm}>
                Добавить товар
            </Button>
            <ProductSort/>
        </div>
    )
})

function App() {
    const [isProductFormOpen, setProductFormOpen] = useState(false);
    const [productId, setProductId] = useState<number | null>(null);
    const [editMode, setEditMode] = useState(false);

    const handleClick = useCallback((id: number) => {
        setProductId(id);
        setEditMode(false)
    }, [])

    const handleOpenForm = useCallback(() => setProductFormOpen(true), []);
    const handleCloseForm = useCallback(() => setProductFormOpen(false), []);
    const handleCloseDetails = useCallback(() => setProductId(null), []);

    const dispatch = useAppDispatch()

    const handleDeleteProduct = () => {
        if (productId !== null) {
            dispatch(deleteProduct(productId));
            setProductId(null);
        }
    }

    return (
        <div className={'container'}>
            <AppHeader onOpenForm={handleOpenForm}/>
            <ProductList onItemClick={handleClick}/>

            <Modal open={isProductFormOpen} onClose={handleCloseForm} aria-label={'product-form'}>
                <Modal.Header>
                    <h3>Новый товар</h3>
                </Modal.Header>
                <Modal.Body>
                    {isProductFormOpen && (
                        <ProductForm formId={'product-add-form'} onSuccess={handleCloseForm}/>)}
                </Modal.Body>
                <Modal.Footer>
                    <AddFooterButtons onCancel={handleCloseForm}/>
                </Modal.Footer>
            </Modal>

            <Modal open={productId !== null} onClose={handleCloseDetails} aria-label={'product-details'}>
                <Modal.Header className={'modal__header--flex'}>
                    <h3>Детали товара</h3>
                    <DetailCloseButton onClose={handleCloseDetails}/>
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
                    <DetailFooter
                        editMode={editMode}
                        onCancelEdit={() => setEditMode(false)}
                        onConfirmEditFormId={'product-edit-form'}
                        onDelete={handleDeleteProduct}
                        onRequestEdit={() => requestAnimationFrame(() => setEditMode(true))}
                    />
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default App
