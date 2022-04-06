import './DeleteActionButton.sass'
import { useState } from 'react'
import { Modal, Button, DeleteIcon } from '../../'
import { deleteAction } from '../../../logic'


export const DeleteActionButton = ({ actionId, onDeleted }) => {
    const [showModal, setShowModal] = useState(false)

    const deleteAct = async () => {
        await deleteAction(sessionStorage.token, actionId)
        setShowModal(false)
        onDeleted && onDeleted()
    }

    const showDeleteModal = () => {
        setShowModal(true)
    }

    const closeDeleteModal = () => {
        setShowModal(false)
    }

    return <>
        <Button onClick={showDeleteModal}>
            <DeleteIcon className='deleteIcon' />
        </Button>
        {showModal && <Modal text='¿Estás seguro que quieres eliminar esta acción?' success={deleteAct} closeModal={closeDeleteModal} />}
    </>
}
