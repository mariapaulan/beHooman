import './ListUserPublicActions.sass'
import { useState, useEffect } from 'react'
import { listUserPublicActions, listFavoriteActions } from '../logic'
import { ActionCard } from '.'

export const ListUserPublicActions = ({ userId = '', goToCreateSchedule, goToUserProfile }) => {

    const [actions, setActions] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const actions = await listUserPublicActions(sessionStorage.token, userId)
                const favorites = await listFavoriteActions(sessionStorage.token)

                actions.forEach(action => {
                    action.isFav = favorites.some(favorite => favorite.id === action.id)
                })

                setActions(actions)
            } catch (error) {
                alert(error.message)
            }
        })()
    }, [userId])


    return <div className='listUserActions'>
        {!!actions.length &&
            <ul className='listUserActions__list'> {actions.map(action =>
                <li key={action.id}>
                    <ActionCard action={action} onCreateSchedule={goToCreateSchedule} onUserProfile={goToUserProfile} />
                </li>)}
            </ul>}
        {!actions.length && <p className='userActions__info'>No hay acciones creadas por este usuario</p>}
    </div>

}