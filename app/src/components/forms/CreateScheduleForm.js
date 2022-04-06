import './CreateScheduleForm.sass'
import { Input, Select, Button, Link, CheckIcon, XIcon, MoneyIcon, StopwatchIcon, CalendarIcon, RepeatIcon } from '../../components'
import { retrieveAction, createSchedule } from '../../logic'
import { useState, useEffect } from 'react'
import { constants } from 'commons'
const { repeatOptions } = constants

export const CreateScheduleForm = ({ actionId, onCreated, onCancel }) => {
    const [description, setDescription] = useState('')
    const [requiredTime, setRequiredTime] = useState('')
    const [requiredBudget, setRequiredBudget] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const action = await retrieveAction(sessionStorage.token, actionId)
                const { description, requiredTime, requiredBudget } = action
                setDescription(description)
                setRequiredTime(requiredTime)
                setRequiredBudget(requiredBudget)
            } catch (error) {
                alert(error.message)
            }
        })()
    }, [actionId])

    const createNewSchedule = async event => {
        try {
            const { target: { date: { value: _date }, repeat: { value: repeat } } } = event
            const date = new Date(_date)
            await createSchedule(sessionStorage.token, actionId, date, repeat)
            onCreated && onCreated()
        } catch (error) {
            alert(error.message)
        }
    }

    const onSubmit = event => {
        event.preventDefault()
        createNewSchedule(event)
    }


    return <>
        <form className='createSchedule__form' onSubmit={onSubmit}>
            <h3 className='createSchedule__description'>{description}</h3>
            <fieldset className='createSchedule__fieldset'>
                <div className='createSchedule__info'>
                    <StopwatchIcon className='createSchedule__icon' />{requiredTime} minutos
                </div>
                <div className='createSchedule__info'>
                    <MoneyIcon className='createSchedule__icon' />{requiredBudget} €
                </div>
                <Input className='input-underlined createSchedule__dateInput' type='datetime-local' name='date' placeholder='Fecha' label={<CalendarIcon className='createSchedule__icon' />} required />
                <Select className='createSchedule__select' name='repeat' id='repeat' options={repeatOptions} required placeholder='Repetición' label={<RepeatIcon className='createSchedule__icon' />} />
            </fieldset>
            <div className='createSchedule__buttons'>
                <Button className='createSchedule__button' type='submit'>
                    <CheckIcon className='createSchedule__buttonIcon' />
                </Button>
                <Link className='createSchedule__button' onClick={onCancel}>
                    <XIcon className='createSchedule__buttonIcon' />
                </Link>
            </div>
        </form>
    </>
}
