import { AiOutlineSearch } from 'react-icons/ai';

const index = ({ title, value, onChange }) => {
    return (
        <div className='flex items-center relative'>
            <input onChange={onChange} value={value} type='text' placeholder={title} className='w-full flex-1 pl-5 pr-12 py-1.5 bg-white border border-gray-300 text-gray-900 text-sm rounded-md' />
            <AiOutlineSearch className='absolute right-0 mx-5 text-blue-600' />
        </div>
    )
}

export default index