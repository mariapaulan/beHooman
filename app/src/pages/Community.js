import './Community.sass'
import { ListFollowingUsers, SearchIcon, Link } from '../components'

export const Community = ({ goToUserProfile, onUsers }) => {


    return <div className='community'>
        <div className='community__search'>
            <Link className='community__link' onClick={onUsers}>
                Buscar Hoomans
                <SearchIcon className='community__searchIcon' />
            </Link>
        </div>
        <ListFollowingUsers goToUserProfile={goToUserProfile} />
    </div>
}