import './CreatedActions.sass'
import { Link, PlusIcon, ListActions, ActionsNavigationBar } from '../components'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { CreateAction, UpdateAction, ListFavoriteActions } from '.'


export const CreatedActions = ({ onSchedules, goToCreateSchedule, goBack, goToUserProfile }) => {

    const navigate = useNavigate()

    const showCreateAction = () => navigate('crear-accion')
    const showEditAction = actionId => navigate(`editar-accion/${actionId}`)
    const showFavorites = () => navigate('favoritas')
    const showActions = () => navigate('/acciones')

    return <>
        <ActionsNavigationBar onSchedules={onSchedules} onCreatedActions={showActions} onFavorites={showFavorites} />
        <Routes>
            <Route index element={
                <div className='createdActions'>
                    <div className='createdActions__header'>
                        <h2 className='createdActions__title'>Mis Acciones</h2>
                        <Link onClick={showCreateAction}>
                            <PlusIcon className='createAction__icon' />
                        </Link>
                    </div>
                    <ListActions goToCreateSchedule={goToCreateSchedule} goToEditAction={showEditAction} />
                </div>
            } />
            <Route path='crear-accion' element={<CreateAction goBack={goBack} onSchedules={onSchedules} onCreatedActions={showActions} onFavorites={showFavorites} />} />
            <Route path='editar-accion/:actionId' element={<UpdateAction goBack={goBack} onSchedules={onSchedules} onCreatedActions={showActions} onFavorites={showFavorites} />} />
            <Route path='favoritas' element={<ListFavoriteActions onSchedules={onSchedules} onCreatedActions={showActions} onFavorites={showFavorites} goToCreateSchedule={goToCreateSchedule} goToUserProfile={goToUserProfile} />} />
        </Routes>
    </>
}