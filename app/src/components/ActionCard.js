import './ActionCard.sass'
import { Link, CalendarIcon, ToggleFavoriteButton } from '.'

export const ActionCard = ({ action = {}, onCreateSchedule, onUserProfile, onToggled }) => {


    return <div className='actionCard' >
        <div className='actionCard__info'>
            <h3 className='actionCard__title'>{action.description}</h3>
            <p className='actionCard__text'>
                Tiempo requerido: {action.requiredTime} min
            </p>
            <p className='actionCard__text'>
                Dinero requerido: {action.requiredBudget} €
            </p>
        </div>
        <div className='actionCard__buttons'>
            <div className='actionCard__topButtons'>
                <Link onClick={(event) => onCreateSchedule(action.id)}>
                    <CalendarIcon className='actionCard__scheduleIcon' />
                </Link>
                <ToggleFavoriteButton actionId={action.id} isFavorite={action.isFav} onToggled={onToggled} />
            </div>
            <Link className='actionCard__author' onClick={(event) => onUserProfile(action.authorId)}>
                By: {action.authorUsername}
            </Link>
        </div>
    </div>
}