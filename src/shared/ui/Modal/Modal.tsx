import './modal.css'
import {useEffect, useRef} from "react";
import * as React from "react";
import {useEscape} from "../../hooks/useEscape.tsx";

type ModalProps = Omit<React.DialogHTMLAttributes<HTMLDialogElement>, 'open'> & {
    open: boolean;
    onClose?: () => void;
    className?: string;
}
type SectionProps = React.HTMLAttributes<HTMLDivElement> & { className?: string; }


const Header: React.FC<SectionProps> = ({className = '', children, ...rest}) => (
    <div className={`modal__header ${className}`} {...rest}>{children}</div>
)

const Body: React.FC<SectionProps> = ({className = '', children, ...rest}) => (
    <div className={`modal__body ${className}`} {...rest}>{children}</div>
)

const Footer: React.FC<SectionProps> = ({className = '', children, ...rest}) => (
    <div className={`modal__footer ${className}`} {...rest}>{children}</div>
)

const ModalRoot = ({open, onClose, className = '', children, ...props}: ModalProps) => {
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const root = document.documentElement;
        if (open) root.classList.add('modal-open');
        return () => root.classList.remove('modal-open')
    }, [open]);

    useEscape(() => {
        if (open) onClose?.();
    })

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (open) {
            if (!el.open) el.showModal();
        } else {
            if (el.open) el.close();
        }
    }, [open]);

    const onBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === ref.current) onClose?.();
    }

    return (
        <dialog ref={ref} onClick={onBackdropClick} className={`modal ${className}`} {...props}>
            {children}
        </dialog>
    )
}

type ModalCompound = React.FC<ModalProps> & {
    Header: React.FC<SectionProps>;
    Body: React.FC<SectionProps>;
    Footer: React.FC<SectionProps>;
}

const Modal = ModalRoot as ModalCompound;
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal