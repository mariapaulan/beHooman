import './UserCard.sass'
import { UserIcon, ToggleFollowButton, Link } from '.'
import { useState } from 'react'

export const UserCard = ({ user = {}, onUserProfile, onToggled }) => {


    return <>
        <div className='userCard' >
            <UserIcon className='userCard__icon' />
            <Link className='userCard__link' onClick={() => onUserProfile(user.id)}>{user.username}</Link>
            <ToggleFollowButton className='userCard__toggle' userId={user.id} isFollow={user.isFollow} onToggled={onToggled} />
        </div>
    </>
}