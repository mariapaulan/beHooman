import './ListFavoriteActions.sass'
import { useState, useEffect } from 'react'
import { listFavoriteActions } from '../logic'
import { ActionCard } from '../components'

export const ListFavoriteActions = ({ goToCreateSchedule, goToUserProfile }) => {

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const favorites = await listFavoriteActions(sessionStorage.token)
                favorites.forEach(favorite => favorite.isFav = true)

                setFavorites(favorites.reverse())
            } catch (error) {
                alert(error.message)
            }
        })()
    }, [])

    const updateFavoritesList = async () => {
        try {
            const favorites = await listFavoriteActions(sessionStorage.token)
            favorites.forEach(favorite => favorite.isFav = true)

            setFavorites(favorites.reverse())
        } catch (error) {
            alert(error.message)
        }
    }


    return <>
        <div className='favorites'>
            <h2 className='favorites__title'>Mis Favoritas</h2>
            <div className='favorites__listFavorites'>
                {!!favorites.length ?
                    <ul className='favorites__listFavoritesList'> {favorites.map(favorite =>
                        <li key={favorite.id}>
                            <ActionCard action={favorite} onCreateSchedule={goToCreateSchedule} onUserProfile={goToUserProfile} onToggled={updateFavoritesList} />
                        </li>)}
                    </ul> : <p className='favorites__listFavoritesText'> Todavía no tienes acciones favoritas</p>}
            </div>
        </div>
    </>
}