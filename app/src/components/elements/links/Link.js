import './Link.sass'


export const Link = ({ children, className = '', onClick }) => {


    const handleClick = event => {
        event.preventDefault()

        onClick()
    }

    return <>
        <a onClick={handleClick} className={`link ${className}`} href=''>{children}</a>
    </>
}
