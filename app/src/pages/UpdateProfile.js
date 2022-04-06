import './UpdateProfile.sass'
import { Link, RightArrowIcon, UserIcon, UpdateProfileForm } from '../components'
import { retrieveUser } from '../logic'
import { useState, useEffect } from 'react'

export const UpdateProfile = ({ onUpdatePassword, onDeleteAccount, onBack }) => {

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

    const refreshProfile = async () => {
        try {
            const user = await retrieveUser(sessionStorage.token)
            setUser(user)
        } catch (error) {
            alert(error.message)
        }
    }



    return <>
        <div className='updateProfile'>
            <h3 className='updateProfile__title'>Modificar Perfil</h3>
            <div className='updateProfile__div'>
                <UserIcon className='updateProfile__icon' />
                <span className='updateProfile__username'>{user.username}</span>
                <UpdateProfileForm onUpdated={refreshProfile} />
                <div className='updateProfile__links'>
                    <Link className='updateProfile__link' onClick={onUpdatePassword}>
                        Actualizar contraseña
                        <RightArrowIcon className='updateProfile__goIcon' />
                    </Link>
                    <Link className='updateProfile__link' onClick={onDeleteAccount}>
                        Eliminar cuenta
                        <RightArrowIcon className='updateProfile__goIcon' />
                    </Link>
                </div>
                <div className='updateProfile_backLink'>
                    <Link onClick={onBack}>Regresar</Link>
                </div>
            </div>
        </div>
    </>
}