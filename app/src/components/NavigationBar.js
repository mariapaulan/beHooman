import './NavigationBar.sass'
import { Link, HappyIcon, HeartIcon, CommunityIcon, ProfileIcon } from '.'
import { useLocation } from 'react-router-dom'

export const NavigationBar = ({ onHome, onSchedules, onCommunity, onProfile }) => {

    const location = useLocation().pathname

    const isActive = path => location.includes(path)


    return <>
        <nav className='navigationMenu'>
            <ul className='navigationMenu__list'>
                <li className='navigationMenu__listItem'>
                    <Link className='navigationMenu__link' onClick={onHome}>
                        <HappyIcon className={`navigationMenu__icon ${location === '/' && 'navigationMenu__icon-active'}`} />
                        Inicio
                    </Link>
                </li>
                <li className='navigationMenu__listItem'>
                    <Link className='navigationMenu__link' onClick={onSchedules}>
                        <HeartIcon className={`navigationMenu__icon ${['acciones', 'favoritas', 'agenda'].some(path => isActive(path)) && 'navigationMenu__icon-active'}`} />
                        Acciones
                    </Link>
                </li>
                <li className='navigationMenu__listItem'>
                    <Link className='navigationMenu__link' onClick={onCommunity}>
                        <CommunityIcon className={`navigationMenu__icon ${['comunidad', 'hoomans'].some(path => isActive(path)) && 'navigationMenu__icon-active'}`} />
                        Comunidad
                    </Link>
                </li>
                <li className='navigationMenu__listItem'>
                    <Link className='navigationMenu__link' onClick={onProfile}>
                        <ProfileIcon className={`navigationMenu__icon ${isActive('perfil') && 'navigationMenu__icon-active'}`} />
                        Perfil
                    </Link>
                </li>
            </ul>
        </nav>
    </>
}