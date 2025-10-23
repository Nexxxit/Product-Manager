import ProductList from "../features/product/ui/productList/ProductList.tsx";
import ProductSort from "../features/product/ui/productSort/productSort.tsx";
import ProductForm from "../features/product/ui/productForm/ProductForm.tsx";
import {useState} from "react";
import Modal from "../shared/ui/Modal/Modal.tsx";
import Button from "../shared/ui/Button/Button.tsx";
import {useAppSelector} from "./store/hooks.ts";
import {selectIsAdding} from "../features/product/model";
import Spinner from "../shared/ui/Spinner/Spinner.tsx";

function App() {
    const [isProductFormOpen, setProductFormOpen] = useState(false);
    const isAdding = useAppSelector(selectIsAdding);

    return (
        <div className={'container'}>
            <div className={'header'}>
                <Button onClick={() => setProductFormOpen(true)}>
                    Добавить товар
                </Button>
                <ProductSort/>
            </div>
            <ProductList/>

            <Modal open={isProductFormOpen} onClose={() => setProductFormOpen(false)} aria-label={'product-form'}>
                <Modal.Header>
                    <h3>Новый товар</h3>
                </Modal.Header>
                <Modal.Body>
                    <ProductForm onSuccess={() => setProductFormOpen(false)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button className={'button--primary'} type={'submit'} form={'product-add-form'} disabled={isAdding}>{isAdding
                        ? (<span>Добавляю... <Spinner className={'spinner-sm'} /></span>)
                        : ('Добавить')
                    }</Button>
                    <Button onClick={() => setProductFormOpen(false)} disabled={isAdding}>Отмена</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default App
