import './ActionsNavigationBar.sass'
import { Link, CalendarIcon, EditIcon, FavoriteIcon } from '.'
import { useLocation } from 'react-router-dom'

export const ActionsNavigationBar = ({ onSchedules, onCreatedActions, onFavorites }) => {

    const location = useLocation().pathname

    return <nav className='navigationActions'>
        <ul className='navigationActions__list'>
            <li className='navigationActions__listItem'>
                <Link onClick={onSchedules}>
                    <CalendarIcon className={`navigationActions__icon ${location.includes('/agenda') && 'navigationActions__icon-active'}`} />
                </Link>
            </li>
            <li className='navigationActions__listItem'>
                <Link onClick={onCreatedActions}>
                    <EditIcon className={`navigationActions__icon ${(location.includes('crear-accion') || location.includes('editar-accion') || location === '/acciones') && 'navigationActions__icon-active'}`} />
                </Link>
            </li>
            <li className='navigationActions__listItem'>
                <Link onClick={onFavorites}>
                    <FavoriteIcon className={`navigationActions__icon ${location.includes('acciones/favoritas') && 'navigationActions__icon-active'}`} />
                </Link>
            </li>
        </ul>
    </nav>
}