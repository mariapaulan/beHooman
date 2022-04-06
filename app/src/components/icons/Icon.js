import './Icon.sass'

export const Icon = ({ style = {}, className = '', children = '' }) => {
    return <>
        <figure style={style} className={`icon ${className}`}>{children}</figure>
    </>
}