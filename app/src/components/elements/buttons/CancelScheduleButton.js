import { useState } from 'react'
import { Modal, Button, XMarkIcon } from '../../'
import { cancelSchedule } from '../../../logic'


export const CancelScheduleButton = ({ className = '', scheduleId, onCanceled }) => {
    const [showModal, setShowModal] = useState(false)

    const cancelScheduleHandler = async () => {
        await cancelSchedule(sessionStorage.token, scheduleId)
        setShowModal(false)
        onCanceled && onCanceled()
    }

    const showCancelModal = () => {
        setShowModal(true)
    }

    const closeCancelModal = () => {
        setShowModal(false)
    }

    return <>
        <Button onClick={showCancelModal}>
            <XMarkIcon className={className} />
        </Button>
        {showModal && <Modal text='Seguro que deseas cancelar esta agenda?' success={cancelScheduleHandler} closeModal={closeCancelModal} />}
    </>
}
