import './Schedules.sass'
import { ListSchedules, ActionsNavigationBar } from '../components'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { CreateSchedule } from '.'


export const Schedules = ({ onCreatedActions, onFavorites, goBack }) => {

    const navigate = useNavigate()

    const showSchedules = () => navigate('/agenda')

    return <>
        <ActionsNavigationBar onSchedules={showSchedules} onCreatedActions={onCreatedActions} onFavorites={onFavorites} />
        <Routes>
            <Route index element={
                <div className='schedules'>
                    <h2 className='schedules__title'>Agendadas</h2>
                    {/* <p>calendario?</p> */}
                    <ListSchedules />
                </div>
            } />
            <Route path='agendar-accion/:actionId' element={<CreateSchedule goBack={goBack} />} />
        </Routes>
    </>
}