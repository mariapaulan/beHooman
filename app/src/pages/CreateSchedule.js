import './CreateSchedule.sass'
import { CreateScheduleForm } from '../components'
import { useParams } from 'react-router-dom'

export const CreateSchedule = ({ goBack }) => {

    const { actionId } = useParams()

    return <div className='createSchedule'>
        <h2 className='createSchedule__title'>Agendar Acción</h2>
        <CreateScheduleForm actionId={actionId} onCreated={goBack} onCancel={goBack} />
    </div>
}
