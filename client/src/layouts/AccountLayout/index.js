import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { route } from '../../routes'
import { signOut } from '../../utils/authUtils'
import { notifySuccess } from '../../components/Toast'

import { FiUser } from 'react-icons/fi'
import { BsJournalText } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import { FiChevronDown } from 'react-icons/fi'
import { FiChevronUp } from 'react-icons/fi'

const AccountLayout = ({ children }) => {
    const navigate = useNavigate()
    const [isShowNavigation, setIsShowNavigation] = useState(false)
    const [navigation, setNavigation] = useState([
        {
            title: 'My Account',
            icon: <FiUser />,
            children: [
                {
                    title: 'Information',
                    navigate: route.accountInfomation
                }
                ,
                {
                    title: 'Address',
                    navigate: route.acccountAddress
                }
            ],
            showChildren: true
        },
        {
            title: 'Orders',
            icon: <BsJournalText />,
            navigate: route.accountOrder
        }
    ])

    const handleClickParent = (title) => {
        setNavigation((prev) => (prev.map(item => item.title === title && item.children ? { ...item, showChildren: !item.showChildren } : item)))
    }

    const handleSignOut = () => {
        signOut()
            .then(res => {
                notifySuccess(res.data.message)
                navigate(route.signIn)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="grid grid-cols-12 gap-4 py-4 lg:px-8 lg:py-20">
            <div className="col-span-12 lg:col-span-2 flex gap-4 px-4 border-r shadow-md lg:shadow-none lg:bg-transparent">
                <div className='lg:hidden py-2'>
                    <button className='text-xl' onClick={() => setIsShowNavigation((prev) => (!prev))}>
                        {isShowNavigation ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                </div>
                <div className={"flex-1 lg:block " + (isShowNavigation ? '' : 'hidden')}>
                    <div className="flex flex-col">
                        {
                            navigation.map(item => (
                                <div key={item.title}>
                                    {
                                        item.navigate ?
                                            <NavLink to={item.navigate}>
                                                <div className="flex items-center justify-between px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200">
                                                    <div className="flex items-center gap-x-4">
                                                        {item.icon}
                                                        <p className="font-medium">{item.title}</p>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            :
                                            <div onClick={() => handleClickParent(item.title)} className="flex items-center justify-between px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200">
                                                <div className="flex items-center gap-x-4">
                                                    {item.icon}
                                                    <p className="font-medium">{item.title}</p>
                                                </div>
                                                {!item.showChildren ? <FiChevronDown /> : <FiChevronUp />}
                                            </div>
                                    }
                                    <div className="flex flex-col gap-1 my-1">
                                        {
                                            item.showChildren && item.children.map((subItem, subIndex) => (
                                                <NavLink
                                                    key={subIndex}
                                                    to={subItem.navigate}
                                                    className={({ isActive }) => (("block pl-12 py-1 text-gray-600 rounded-md hover:bg-gray-200 ") + (isActive ? "bg-gray-200" : ""))}
                                                >
                                                    {subItem.title}
                                                </NavLink>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div onClick={handleSignOut} className="flex items-center gap-4 px-4 py-2 cursor-pointer">
                        <BiLogOut />
                        <p className="font-medium text-red-500">Signout</p>
                    </div>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-10">
                {children}
            </div>
        </div>
    )
}

export default AccountLayout