import './Register.sass'
import { RegisterForm, Logo, Link } from '../components'


export const Register = ({ goToLogin, onLogin }) => {


    return <div className='register'>
        <Logo className='main-logo' type='main' alt='bHoomanLogo' />
        <RegisterForm onRegistered={goToLogin} />
        <Link onClick={onLogin}>Ya tengo una cuenta</Link>
    </div>
}
