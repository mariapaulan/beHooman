import './LoginForm.sass'
import { Input, Button, GoIcon } from '../../components'
import { authenticateUser } from '../../logic'


export const LoginForm = ({ onLogged }) => {

    const login = async event => {
        try {
            const { target: { email: { value: email }, password: { value: password } } } = event

            const token = await authenticateUser(email, password)
            sessionStorage.token = token
            onLogged && onLogged(event)

        } catch (error) {
            alert(error.message)
        }
    }

    const onSubmit = event => {
        event.preventDefault()
        login(event)
    }

    return <>
        <form className='login__form' onSubmit={onSubmit}>
            <fieldset className='login__fieldset'>
                <legend className='login__legend'>Ingresar</legend>
                <Input className='input-bordered' type='email' name='email' placeholder='Email' required />
                <Input className='input-bordered' type='password' name='password' placeholder='Contraseña' required />
            </fieldset>
            <Button className='login__button' type='submit'>
                <GoIcon className='login__button' />
            </Button>
        </form>
    </>
}
