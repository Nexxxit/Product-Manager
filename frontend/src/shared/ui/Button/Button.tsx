import './button.css'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
}

const Button = ({className = '', type = 'button', children, ...props}: ButtonProps) => {
    return (
        <button className={`button ${className}`} type={type} {...props}>
            {children}
        </button>
    )
}

export default Button