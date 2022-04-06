import './ListSearchUsersResults.sass'
import { findUsers, listFollowingUsers } from '../logic'
import { UserCard } from '.'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const ListSearchUsersResults = ({ goToUserProfile }) => {
    const [users, setUsers] = useState([])
    const [searchParams] = useSearchParams()

    const query = searchParams.get('query')

    useEffect(() => {
        (async () => {
            try {
                const users = await findUsers(sessionStorage.token, query)
                const following = await listFollowingUsers(sessionStorage.token)

                users.forEach(user => {
                    user.isFollow = following.some(follow => follow.id === user.id)
                })

                setUsers(users)

            } catch (error) {
                alert(error.message)
            }
        })()
    }, [query])


    return <>
        <div className='searchUsersResults'>
            <h2 className='searchUsersResults__title'>Hoomans encontrados</h2>
            <div className='searchUsersResults__listUsers'>
                {!!users.length ?
                    <ul className='searchUsersResults__listUsersList'> {users.map(user =>
                        <li key={user.id}>
                            <UserCard user={user} onUserProfile={goToUserProfile} />
                        </li>)}
                    </ul> : <p className='searchUsersResults__listUsersText'> No hay resultados para tu búsqueda</p>}
            </div>
        </div>
    </>
}