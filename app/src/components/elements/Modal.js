import './Modal.sass'
import { Button, CheckIcon, XIcon } from '../../components'

export const Modal = ({ text, success, closeModal }) => {

    const onOutsideClick = () => {
        closeModal && closeModal()
    }

    const onSuccess = event => {
        event.stopPropagation()
        success && success(event)
    }

    const onClose = event => {
        event.stopPropagation()
        closeModal && closeModal()
    }

    return <div className='modal-outside' onClick={onOutsideClick}>
        <div className='modal-card' onClick={event => event.stopPropagation()}>
            <p>{text}</p>
            <div className='modal__buttons'>
                <Button className='modal__button' onClick={onSuccess}>
                    <CheckIcon className='modal__icon' />
                </Button>
                <Button className='modal__button' onClick={onClose}>
                    <XIcon className='modal__icon' />
                </Button>
            </div>
        </div>
    </div>

}