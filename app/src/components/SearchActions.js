import './SearchActions.sass'
import { Input, Select, Button, MoneyIcon, StopwatchIcon, SearchIcon, RemoveFilterIcon } from '.'
import { constants } from 'commons'
const { requiredTimeOptions, requiredBudgetOptions } = constants

export const SearchActions = ({ onSearchActions, onReset }) => {

    const search = event => {
        const { target: { query: { value: _query }, requiredBudget: { value: _requiredBudget }, requiredTime: { value: _requiredTime } } } = event

        const query = _query ? _query : null
        const requiredTime = _requiredTime ? Number(_requiredTime) : null
        const requiredBudget = _requiredBudget ? Number(_requiredBudget) : null

        onSearchActions && onSearchActions({ query, requiredTime, requiredBudget })
    }

    const onSubmit = event => {
        event.preventDefault()
        search(event)
    }

    return <>
        <form className='searchActions__form' onSubmit={onSubmit}  >
            <fieldset className='searchActions__fieldset'>
                <Input className='input-underlined searchActions__input' type='text' name='query' placeholder='Busca acciones' />
                <Select className='searchActions__select' name='requiredTime' id='requiredTime' options={requiredTimeOptions} appendText={'min'} placeholder='Todos' label={<StopwatchIcon />} />
                <Select className='searchActions__select' name='requiredBudget' id='requiredBudget' options={requiredBudgetOptions} placeholder='Todos' appendText={'€'} label={<MoneyIcon />} />
            </fieldset>
            <Button className='searchActions__button' type='submit'>
                <SearchIcon className='searchActions__icon' />
            </Button>
            <Button className='searchActions__button' type='reset' onClick={onReset}>
                <RemoveFilterIcon className='searchActions__icon' />
            </Button>
        </form>
    </>


}