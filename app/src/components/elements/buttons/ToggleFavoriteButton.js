import './ToggleFavoriteButton.sass'
import { useState } from 'react'
import { toggleFavoriteAction } from '../../../logic'
import { FavoriteIcon } from '../../icons'
import { Button } from '.'


export const ToggleFavoriteButton = ({ actionId, isFavorite = false, onToggled }) => {

    const [favorite, setFavorite] = useState(isFavorite)

    const toggleFavorite = async () => {
        try {
            await toggleFavoriteAction(sessionStorage.token, actionId)
            setFavorite(!favorite)
            onToggled && onToggled()
        } catch (error) {
            alert(error.message)
        }
    }

    const onToggle = event => {
        event.preventDefault()
        toggleFavorite()
    }

    return <>
        <Button type="button" onClick={onToggle}>
            <FavoriteIcon className={`${favorite ? 'favorite-on' : 'favorite-off'}`} />
        </Button>
    </>
}

