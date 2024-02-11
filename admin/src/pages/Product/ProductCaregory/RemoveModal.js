import { useState, useEffect } from 'react'

import Modal from '../../../components/Modal'
import DangerConfirm from '../../../components/DangerConfirm'

const DeleteModal = ({ handleCloseRemove, typeElementCurrent, handleDeleteElementById }) => {
    return (
        <Modal>
            <DangerConfirm
                title={typeElementCurrent}
                content={`Are you sure you want to delete this ${typeElementCurrent}`}
                titleConfirm='Delete'
                onCancel={handleCloseRemove}
                onConfirm={handleDeleteElementById}
            >
            </DangerConfirm>
        </Modal>
    )
}

export default DeleteModal