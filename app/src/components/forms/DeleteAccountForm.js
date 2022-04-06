import './DeleteAccountForm.sass'
import { Input, Button } from '../../components'
import { deleteUser } from '../../logic'

export const DeleteAccountForm = ({ onDeleted }) => {

    const deleteAccount = async event => {
        try {
            const { target: { password: { value: password } } } = event

            await deleteUser(sessionStorage.token, password)
            delete sessionStorage.token
            onDeleted && onDeleted()
            alert('Cuenta eliminada :(')

        } catch (error) {
            alert(error.message)
        }
    }

    const onSubmit = event => {
        event.preventDefault()
        deleteAccount(event)
    }

    return <>
        <form className='deleteAccountForm__form' onSubmit={onSubmit}>
            <Input className='input-underlined deleteAccountForm__input' type='password' name='password' placeholder='Contraseña' required />
            <Button className='deleteAccountForm__button' type='submit'> Eliminar </Button>
        </form>
    </>
}
