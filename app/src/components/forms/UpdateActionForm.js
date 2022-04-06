import './UpdateActionForm.sass'
import { useState, useEffect } from 'react'
import { Input, Select, Checkbox, Button, Link, StopwatchIcon, MoneyIcon, CheckIcon, XIcon } from '..'
import { retrieveAction, updateAction } from '../../logic'
import { constants } from 'commons'
const { requiredTimeOptions, requiredBudgetOptions } = constants


export const UpdateActionForm = ({ actionId, onUpdated, onCancel }) => {

    const [description, setDescription] = useState('')
    const [isPublic, setIsPublic] = useState(false)
    const [requiredTime, setRequiredTime] = useState('')
    const [requiredBudget, setRequiredBudget] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const action = await retrieveAction(sessionStorage.token, actionId)
                const { description, public: isPublic, requiredTime, requiredBudget } = action
                setDescription(description)
                setIsPublic(isPublic)
                setRequiredTime(requiredTime)
                setRequiredBudget(requiredBudget)
            } catch (error) {
                alert(error.message)
            }
        })()
    }, [actionId])

    const updateUserAction = async event => {
        try {
            const { target: { description: { value: description }, requiredTime: { value: _requiredTime }, requiredBudget: { value: _requiredBudget }, isPublic: { checked: isPublic } } } = event

            const requiredTime = Number(_requiredTime)
            const requiredBudget = Number(_requiredBudget)

            await updateAction(sessionStorage.token, actionId, description, isPublic, requiredTime, requiredBudget)
            onUpdated && onUpdated()

        } catch (error) {
            alert(error.message)
        }
    }

    const onSubmit = event => {
        event.preventDefault()
        updateUserAction(event)
    }


    return <>
        <form className='updateActionForm__form' onSubmit={onSubmit}>
            <fieldset className='updateActionForm__fieldset'>
                <Input className='input-bordered updateActionForm__input' type='text' name='description' defaultValue={description} placeholder='Descripción' required />
                <Select className='updateActionForm__select' name='requiredTime' id='requiredTime' options={requiredTimeOptions} value={requiredTime} placeholder='Tiempo requerido' label={<StopwatchIcon />} required />
                <Select className='updateActionForm__select' name='requiredBudget' id='requiredBudget' options={requiredBudgetOptions} value={requiredBudget} placeholder='Dinero requerido' label={<MoneyIcon />} required />
                <Checkbox className='updateActionForm__checkbox' id='isPublic' name='isPublic' label='Hacer Pública' checked={isPublic} />
            </fieldset>
            <div className='updateActionForm__buttons'>
                <Button className='updateActionForm__button' type='submit'>
                    <CheckIcon className='updateActionForm__buttonIcon' />
                </Button>
                <Link className='updateActionForm__button' onClick={onCancel}>
                    <XIcon className='updateActionForm__buttonIcon' />
                </Link>
            </div>
        </form>
    </>
}
