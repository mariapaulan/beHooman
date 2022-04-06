import './DeleteAccount.sass'
import { DeleteAccountForm, UserIcon, Link } from '../components'
import { retrieveUser } from '../logic'
import { useState, useEffect } from 'react'

export const DeleteAccount = ({ goToLogin, onBack }) => {

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
        <div className='deleteAccount'>
            <h2 className='deleteAccount__title'>Eliminar cuenta</h2>
            <div className='deleteAccount__div'>
                <UserIcon className='deleteAccount__icon' />
                <span className='deleteAccount__username'>{user.username}</span>
                <DeleteAccountForm onDeleted={goToLogin} />
                <div className='deleteAccount_backLink'>
                    <Link onClick={onBack}>Regresar</Link>
                </div>
            </div>
        </div>
    </>
}