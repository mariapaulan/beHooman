import './UpdatePassword.sass'
import { UserIcon, UpdatePasswordForm, Link } from '../components'
import { retrieveUser } from '../logic'
import { useState, useEffect } from 'react'


export const UpdatePassword = ({ onBack }) => {

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

    return <>
        <div className='updatePassword'>
            <h2 className='updatePassword__title'>Actualizar contraseña</h2>
            <div className='updatePassword__div'>
                <UserIcon className='updatePassword__icon' />
                <span className='updatePassword__username'>{user.username}</span>
                <UpdatePasswordForm />
                <div className='updatePassword_backLink'>
                    <Link onClick={onBack}>Regresar</Link>
                </div>
            </div>
        </div>
    </>
}