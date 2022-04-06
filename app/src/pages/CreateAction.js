import './CreateAction.sass'
import { CreateActionForm, ActionsNavigationBar } from '../components'


export const CreateAction = ({ onSchedules, onCreatedActions, onFavorites, goBack }) => {

    return <>
        <div className='createAction'>
            <h2 className='createAction__title'>Crear Acción</h2>
            <CreateActionForm onCreated={goBack} onCancel={goBack} />
        </div>
    </>
}