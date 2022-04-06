import './ListFollowingUsers.sass'
import { useState, useEffect } from 'react'
import { listFollowingUsers } from '../logic'
import { UserCard } from '.'

export const ListFollowingUsers = ({ goToUserProfile }) => {

    const [following, setFollowing] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const following = await listFollowingUsers(sessionStorage.token)
                following.forEach(follow => follow.isFollow = true)

                setFollowing(following.reverse())
            } catch (error) {
                alert(error.message)
            }
        })()
    }, [])

    const updateFollowingUsers = async () => {
        const following = await listFollowingUsers(sessionStorage.token)
        following.forEach(follow => follow.isFollow = true)

        setFollowing(following.reverse())
    }


    return <>
        <div className='following'>
            <h2 className='following__title'>Comunidad Hoomans </h2>
            <div className='following__listFollowing'>
                {!!following.length ?
                    <ul className='following__listFollowingList'> {following.map(follow =>
                        <li key={follow.id}>
                            <UserCard user={follow} onUserProfile={goToUserProfile} onToggled={updateFollowingUsers} />
                        </li>)}
                    </ul> : <p className='following__listFollowingText'> Todavía no has seguido a otros hoomans</p>}
            </div>
        </div>
    </>
}