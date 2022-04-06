import './Profile.sass'
import { UserIcon, Link, RightArrowIcon, Button, LogoutIcon } from '../components'
import { retrieveUser } from '../logic'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { UpdateProfile, UpdatePassword, DeleteAccount, } from '.'


export const Profile = ({ onActivity, onLogout, goBack, goToLogin }) => {

    const navigate = useNavigate()
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


    const handleLogout = event => {
        event.preventDefault()
        delete sessionStorage.token
        onLogout(event)
    }

    const showUpdatePassword = () => navigate('modificar-contrasena')
    const showDeleteAccount = () => navigate('eliminar-cuenta')
    const showUpdateProfile = () => navigate('actualizar-perfil')
    const showProfile = () => navigate('/perfil')

    return <>
        <Routes>
            <Route index element={
                <div className='profile'>
                    <h3 className='profile__title'>Mi Perfil</h3>
                    <div className='profile__div'>
                        <UserIcon className='profile__icon' />
                        <span className='profile__username'>{user.username}</span>
                        <span className='profile__completed'>{user.doneActs} Acciones hechas</span>
                        <Link className='profile__updateLink' onClick={showUpdateProfile}>
                            Modificar Perfil
                            <RightArrowIcon className='profile__goIcon' />
                        </Link>
                        {/* <Link onClick={onActivity}>Actividad <RightArrowIcon /></Link> */}
                        <div className='profile__logoutDiv'>
                            Cerrar sesión
                            <Button className='profile__logoutButton' type='button' onClick={handleLogout}>
                                <LogoutIcon className='profile__logoutIcon' />
                            </Button></div>
                    </div>
                </div >
            } />
            <Route path='modificar-contrasena' element={<UpdatePassword goToProfile={showProfile} onBack={goBack} />} />
            <Route path='actualizar-perfil' element={<UpdateProfile goToProfile={showProfile} onUpdatePassword={showUpdatePassword} onDeleteAccount={showDeleteAccount} onBack={goBack} />} />
            <Route path='eliminar-cuenta' element={<DeleteAccount goToLogin={goToLogin} onBack={goBack} />} />
        </Routes>
    </>
}