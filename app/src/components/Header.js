import './Header.sass'
import { Link, Logo } from '.'

export const Header = ({ onLogo }) => {


    return <>
        <header className='header'>
            <h1 className='header__title'>bHooman</h1>
            <Link onClick={onLogo}>
                <Logo className='header__logo' alt='logo bHooman' type='small' />
            </Link>
        </header>
    </>
}