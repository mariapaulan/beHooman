import './Select.sass'
import { useEffect, useState } from 'react'


export const Select = ({ className = {}, name = '', id = '', options = [], placeholder = 'Selecciona una opción', required = false, value = '', label }) => {

    const [selectValue, setSelectValue] = useState(value)

    useEffect(() => {

        setSelectValue(value)

    }, [value])

    const onChange = event => {
        setSelectValue(event.target.value)
    }

    return <div className={`select__div ${className}`}>
        {label && <label htmlFor={id} className={`${className}-label`}>{label}</label>}
        <select className={`select ${className}`} name={name} id={id} required={required} value={selectValue} onChange={onChange}>
            <option value=''>{placeholder}</option>
            {options.map(option =>
                <option key={option[0]} value={option[0]} >{option[1]}</option>
            )}
        </select>
    </div>
}