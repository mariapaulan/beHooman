import './Button.sass'


export const Button = ({ type = 'button', children = 'Enviar', onClick, className = '' }) => {

    
    return <>
        <button onClick={onClick} type={type} className={`button ${className}`}>{children}</button>
    </>
}

