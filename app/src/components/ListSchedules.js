import './ListSchedules.sass'
import { useState, useEffect } from 'react'
import { listSchedules } from '../logic'
import { ScheduleCard } from '.'


export const ListSchedules = () => {

    const [schedules, setSchedules] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const schedules = await listSchedules(sessionStorage.token)
                setSchedules(schedules.reverse())
            } catch (error) {
                alert(error.message)
            }
        })()
    }, [])

    const updateSchedulesList = async () => {
        try {
            const schedules = await listSchedules(sessionStorage.token)
            setSchedules(schedules.reverse())
        } catch (error) {
            alert(error.message)
        }
    }


    return <>
        <div className='listSchedules'>
            {!!schedules.length ?
                <ul className='listSchedules__list'> {schedules.map(schedule =>
                    <li key={schedule.id}>
                        <ScheduleCard schedule={schedule} onUpdated={updateSchedulesList} />
                    </li>)}
                </ul> : <p className='listSchedules__text'> Todavía no tienes acciones agendadas</p>}
        </div>
    </>

}