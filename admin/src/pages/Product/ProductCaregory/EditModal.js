import { useState, useEffect } from 'react'

import Modal from '../../../components/Modal'
import SuccessConfirm from '../../../components/SuccessConfirm'
import Input from '../../../components/Input'

const EditModal = ({ handleCloseEdit, typeElementCurrent, handleGetElementById, handleUpdateElementById }) => {
    const [data, setData] = useState({})

    const handleChangeData = e => {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        handleGetElementById()
            .then(res => setData({ name: res.data.data.name, image: res.data.data.image }))
            .catch(err => console.log(err))
    }, [])

    return (
        <Modal>
            <SuccessConfirm
                title={'Product ' + typeElementCurrent}
                content={`Are you sure you want to change this ${typeElementCurrent}`}
                onCancel={handleCloseEdit}
                onConfirm={() => handleUpdateElementById(data)}
            >
                {
                    Object.keys(data).length ?
                        <div className='flex flex-col gap-4 px-4'>
                            <div className='flex flex-col gap-4'>
                                <p>Name</p>
                                <Input
                                    name='name'
                                    value={data.name}
                                    onChange={handleChangeData}
                                />
                            </div>
                            <div className='flex flex-col gap-4'>
                                <p>Image</p>
                                <Input
                                    name='image'
                                    value={data.image}
                                    onChange={handleChangeData}
                                />
                            </div>
                        </div>
                        :
                        <div className='p-4'>
                            Loading...
                        </div>
                }
            </SuccessConfirm>
        </Modal>
    )
}

export default EditModal