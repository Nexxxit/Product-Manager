import './spinner.css'

type SpinnerProps = {
    className?: string;
}

const Spinner = ({className}: SpinnerProps) => {
    return (
        <span className={`spinner ${className}`} aria-hidden={"true"}></span>
    )
}

export default Spinner