import './RegisterForm.sass'
import { Input, Button, GoIcon } from '../../components'
import { registerUser } from '../../logic'


export const RegisterForm = ({ onRegistered }) => {

    const register = async event => {
        try {
            const { target: { username: { value: username }, email: { value: email }, password: { value: password } } } = event

            await registerUser(username, email, password)
            onRegistered && onRegistered(event)
        } catch (error) {
            alert(error.message)
        }
    }

    const onSubmit = event => {
        event.preventDefault()
        register(event)
    }

    return <>
        <form className='register__form' onSubmit={onSubmit}>
            <fieldset className='register__fieldset'>
                <legend className='register__legend'>Registrarse</legend>
                <Input className='input-bordered' type='text' name='username' placeholder='Usuario' required />
                <Input className='input-bordered' type='email' name='email' placeholder='Email' required />
                <Input className='input-bordered' type='password' name='password' placeholder='Contraseña' required />
            </fieldset>
            <Button className='register__button' type='submit'>
                <GoIcon className='register__button' />
            </Button>
        </form>
    </>
}
