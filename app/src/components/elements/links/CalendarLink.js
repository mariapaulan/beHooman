import './CalendarLink.sass'
import { Link } from '.'
import { CalendarIcon } from '../../icons'


export const CalendarLink = ({ onClick }) => {


    return <>
        <Link onClick={onClick}>
            <CalendarIcon />
        </Link>
    </>
}

