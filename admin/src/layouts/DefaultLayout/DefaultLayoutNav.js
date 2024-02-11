import { useState } from 'react'
import { NavLink } from 'react-router-dom';

import { GoPackage } from 'react-icons/go';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiUserLine } from 'react-icons/ri';
import { HiOutlinePresentationChartLine } from 'react-icons/hi';
import { RxDotFilled } from 'react-icons/rx';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { BiChevronRight } from 'react-icons/bi';


const DefaultLayoutNav = ({ handleCloseNavigation }) => {
    const [navigation, setNavigation] = useState([
        {
            icon: <GoPackage />,
            titleNav: 'Products',
            to: '/products',
            children: [
                {
                    titleNav: 'Product Management',
                    titlePage: 'Product Management',
                    to: '/products/management',
                },
                {
                    titleNav: 'Product Categories',
                    titlePage: 'Product Categories',
                    to: '/products/caregories',
                },
                {
                    titleNav: 'Add New Product',
                    titlePage: 'Product Editor',
                    to: '/products/add',
                },
            ],
            showChildren: true
        },
        {
            icon: <AiOutlineShoppingCart />,
            titleNav: 'Orders',
            to: '/orders',
        },
        {
            icon: <RiUserLine />,
            titleNav: 'Customers',
            to: '/customers',
        },
        {
            icon: <HiOutlinePresentationChartLine />,
            titleNav: 'Statistics',
            to: '/statistics',
        },
    ])

    const handleClickNav = (key) => {
        setNavigation((prev) => {
            let newNav = []
            prev.forEach((item, index) => {
                if (key === index) newNav.push({ ...item, showChildren: !item.showChildren })
                else newNav.push(item)
            })
            return newNav
        })
    }

    return (
        <div>
            {
                navigation.map((item, index) => (
                    <div key={index}>
                        {
                            item.children ?
                                <div onClick={() => handleClickNav(index)} className='relative flex items-center justify-between px-3 py-2 my-2 rounded-md cursor-pointer hover:bg-gray-200'>
                                    <div className='flex items-center gap-x-3'>
                                        <div className='text-lg'>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className='font-medium'>{item.titleNav}</p>
                                        </div>
                                    </div>
                                    <div>
                                        {item.showChildren ? <BiChevronDown /> : <BiChevronRight />}
                                    </div>
                                </div>
                                :
                                <NavLink
                                    to={item.to}
                                    onClick={handleCloseNavigation}
                                    className={({ isActive }) => ('relative flex items-center gap-x-3 px-3 py-2 my-2 rounded-md hover:bg-gray-200 ' + (isActive ? 'bg-gray-200' : ''))}
                                >
                                    <div className='text-lg'>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className='font-medium'>{item.titleNav}</p>
                                    </div>
                                    {item.info && <span className='absolute right-0 bg-teal-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded'>15</span>}
                                </NavLink>
                        }
                        {
                            item.children && item.showChildren &&
                            <div className='pl-10'>
                                {
                                    item.children.map((child, index) => (
                                        <NavLink
                                            key={index}
                                            to={child.to}
                                            onClick={handleCloseNavigation}
                                            className={({ isActive }) => ('flex items-center gap-x-1 mt-2 px-3 py-1.5 text-gray-500 cursor-pointer rounded-md hover:bg-gray-200 hover:text-black ' + (isActive ? 'bg-gray-200 text-black' : ''))}
                                        >
                                            <RxDotFilled />
                                            <p className='font-medium'>{child.titleNav}</p>
                                        </NavLink>
                                    ))
                                }
                            </div>
                        }
                    </div>
                ))
            }
            <div className='my-4 border-t'></div>
            <div>
                <NavLink to='/setting' onClick={handleCloseNavigation} className='flex items-center gap-x-3 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-200'>
                    <div className='text-lg'>
                        <AiOutlineSetting />
                    </div>
                    <div>
                        <p className='font-medium'>Setting</p>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default DefaultLayoutNav