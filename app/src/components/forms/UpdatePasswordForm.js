import './UpdatePasswordForm.sass'
import { Input, Button, Link } from '..'
import { updateUserPassword } from '../../logic'

export const UpdatePasswordForm = ({ }) => {

    const onUpdatePassword = async event => {
        try {
            const { target: { currentPassword: { value: currentPassword }, newPassword: { value: newPassword }, confirmNewPassword: { value: confirmNewPassword } } } = event

            await updateUserPassword(sessionStorage.token, currentPassword, newPassword, confirmNewPassword)
            alert('Contraseña actualizada')

            event.target.reset()
        
        } catch (error) {
            alert(error.message)
        }
    }

    const onSubmit = event => {
        event.preventDefault()
        onUpdatePassword(event)
    }


    return <>
        <form className='updatePasswordForm__form' onSubmit={onSubmit}>
            <fieldset className='updatePasswordForm__fieldset'>
                <Input className='input-underlined updatePasswordForm__input' type='password' name='currentPassword' label='Contraseña actual' required />
                <Input className='input-underlined updatePasswordForm__input' type='password' name='newPassword' label='Nueva contraseña' required />
                <Input className='input-underlined updatePasswordForm__input' type='password' name='confirmNewPassword' label='Confirmar contraseña' required />
            </fieldset>
            <Button className='updatePasswordForm__button' type='submit'> Actualizar </Button>
        </form>
    </>
}
