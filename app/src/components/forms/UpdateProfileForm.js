import './UpdateProfileForm.sass'
import { Input, Button } from '..'
import { retrieveUser, updateUser } from '../../logic'
import { useState, useEffect } from 'react'

export const UpdateProfileForm = ({ onUpdated }) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        (async () => {
            try {
                const user = await retrieveUser(sessionStorage.token)
                setUser(user)
            } catch (error) {
                alert(error.message)
            }
        })()
    }, [])

    const onUpdateUser = async event => {
        try {
            // const { target: { username: { value: username }, email: { value: email }, notifications: { checked: notifications } } } = event
            const { target: { username: { value: username }, email: { value: email } } } = event


            await updateUser(sessionStorage.token, username, email, true)
            onUpdated && onUpdated()
            alert('Perfil Actualizado')

            const user = await retrieveUser(sessionStorage.token)
            setUser(user)

        } catch (error) {
            alert(error.message)
        }

    }

    const onSubmit = event => {
        event.preventDefault()
        onUpdateUser(event)
    }


    return <>
        <form className='updateProfileForm__form' onSubmit={onSubmit}>
            <fieldset className='updateProfileForm__fieldset'>
                <Input className='input-underlined updateProfileForm__input' type='text' name='username' defaultValue={user.username} label='Usuario' required />
                <Input className='input-underlined updateProfileForm__input' type='text' name='email' defaultValue={user.email} label='Email' required />
                {/* <Checkbox id='notifications' name='notifications' label='Notificaciones' checked={user.notifications} /> */}
            </fieldset>
            <Button className='updateProfileForm__button' type='submit'> Actualizar </Button>
        </form>
    </>
}
