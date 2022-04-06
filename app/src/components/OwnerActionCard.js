import './OwnerActionCard.sass'
import { Link, CalendarIcon, DeleteActionButton, EditIcon } from '.'

export const OwnerActionCard = ({ action = {}, onCreateSchedule, onEditAction, onDeleted }) => {


    return <div className='ownerActionCard' >
        <div className='ownerActionCard__info'>
            <h3 className='ownerActionCard__title'>{action.description}</h3>
            <p className='ownerActionCard__text'>
                Tiempo requerido: {action.requiredTime} min
            </p>
            <p className='ownerActionCard__text'>
                Dinero requerido: {action.requiredBudget} €
            </p>
            <p className='ownerActionCard__text'>
                Estado: {action.public ? 'Pública' : 'Privada'}
            </p>
        </div>
        <div className='ownerActionCard__buttons'>
            <Link onClick={() => onCreateSchedule(action.id)}>
                <CalendarIcon className='ownerActionCard__icon' />
            </Link>
            <div className='ownerActionCard__bottomButtons'>
                <Link onClick={() => onEditAction(action.id)}>
                    <EditIcon className='ownerActionCard__icon' />
                </Link>
                <DeleteActionButton className='ownerActionCard__deleteButton' actionId={action.id} onDeleted={onDeleted} />
            </div>
        </div>
    </div>
}