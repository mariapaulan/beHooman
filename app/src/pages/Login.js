import './Login.sass'
import { Logo, Link, LoginForm } from '../components'



export const Login = ({ goToHome, onRegister }) => {


    return <div className='login'>
        <Logo className='main-logo' type='main' alt='bHoomanLogo' />
        <LoginForm onLogged={goToHome} />
        <Link onClick={onRegister}>No tengo una cuenta todavía</Link>
    </div>
}