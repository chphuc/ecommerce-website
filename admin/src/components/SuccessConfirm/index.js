import Button from '../Button'
import { AiFillSafetyCertificate } from 'react-icons/ai';

const index = ({ title, content, onCancel, onConfirm, children }) => {
    return (
        <div className='w-full lg:w-1/3 flex flex-col gap-y-4 mx-4 bg-white rounded-md shadow-md overflow-hidden'>
            <div className='flex gap-x-4 p-4'>
                <AiFillSafetyCertificate className='p-2 rounded-full bg-green-100 text-5xl text-green-600' />
                <div className='flex-1'>
                    <p className='font-medium'>{title}</p>
                    <p className='text-sm text-gray-500'>{content}</p>
                </div>
            </div>
            {children}
            <div className='flex items-center justify-end gap-x-4 p-4 bg-gray-50'>
                <Button
                    type='outline'
                    title='Cancel'
                    onClick={onCancel}
                />
                <Button
                    type='success'
                    title='Confirm'
                    onClick={onConfirm}
                />
            </div>
        </div>
    )
}

export default index