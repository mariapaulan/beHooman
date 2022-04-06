import './EditLink.sass'
import { Link } from '.'
import { EditIcon } from '../../icons'


export const EditLink = ({ onClick }) => {

    
    return <>
        <Link onClick={onClick}>
            <EditIcon />
        </Link>
    </>
}




