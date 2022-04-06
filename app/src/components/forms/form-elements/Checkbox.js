import './Checkbox.sass'
import { useState, useEffect } from 'react'

export const Checkbox = ({ id = '', name = '', label, checked = false }) => {

    const [isChecked, setIsChecked] = useState(checked)

    useEffect(() => {
        setIsChecked(checked)
    }, [checked])

    const onChange = event => {
        const { target: { checked } } = event
        setIsChecked(checked)
    }

    return <div>
        <input onChange={onChange} type="checkbox" id={id} name={name} checked={isChecked} />
        {label && <label htmlFor={id}> {label}</label>}
    </div>
}