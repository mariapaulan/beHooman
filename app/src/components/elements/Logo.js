import './Logo.sass'
import logoBrand from '../../assets/images/logoBrand.png'
import logo from '../../assets/images/logo.png'


export const Logo = ({ className = '', alt = 'logo bHooman', type = 'small' }) => {
    return <>
        <figure className={className} >
            <img className='logo__image' src={type === 'small' ? logo : type === 'main' ? logoBrand : logo} alt={alt} />
        </figure>
    </>
}
