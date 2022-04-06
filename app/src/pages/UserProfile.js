import './UserProfile.sass'
import { UserIcon, ToggleFollowButton, ListUserPublicActions } from '../components'
import { retrieveUserPublicInfo, listFollowingUsers } from '../logic'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const UserProfile = ({ goToCreateSchedule, goToUserProfile }) => {

    const { userId } = useParams()
    const [user, setUser] = useState({})

    useEffect(() => {
        (async () => {
            try {
                const user = await retrieveUserPublicInfo(sessionStorage.token, userId)
                const following = await listFollowingUsers(sessionStorage.token)
                user.isFollow = following.some(follow => follow.id === user.id)
                setUser(user)
            } catch (error) {
                alert(error.message)
            }
        })()
    }, [userId])


    return <>
        {!!user.id &&
            <div className='userProfile' >
                <UserIcon className='userProfile__icon' />
                <div className='userProfile__title'>
                    <span className='userProfile__username'>{user.username}</span>
                    <ToggleFollowButton className='userProfile__toggle' userId={user.id} isFollow={user.isFollow} />
                </div>
                <span className='userProfile__completed'>{user.doneActs} Acciones hechas</span>
                <h3 className='userProfile__createdTitle'>Acciones creadas</h3>
                <ListUserPublicActions userId={user.id} goToCreateSchedule={goToCreateSchedule} goToUserProfile={goToUserProfile} />
            </div>}
    </>
}