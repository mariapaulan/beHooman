import './UpdateAction.sass'
import { ActionsNavigationBar, UpdateActionForm } from '../components'
import { useParams } from 'react-router-dom'

export const UpdateAction = ({ onSchedules, onCreatedActions, onFavorites, goBack }) => {

    const { actionId } = useParams()


    return <>
        <div className='updateAction'>
            <h2 className='updateAction__title'>Editar Acción</h2>
            <UpdateActionForm actionId={actionId} onUpdated={goBack} onCancel={goBack} />
        </div>
    </>
}