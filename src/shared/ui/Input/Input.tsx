import './input.css'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
}

const Input = ({className = '', type = 'text', ...props}: InputProps) => {
    return (
        <input className={`input ${className}`} type={type} {...props} />
    )
}

export default Input