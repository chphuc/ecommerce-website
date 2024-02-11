import { useState, useEffect } from 'react'

import DefaultLayoutNav from './DefaultLayoutNav'
import OutsideAlerter from '../../components/OutsideAlerter'
import Modal from '../../components/Modal'

import { FiMenu } from 'react-icons/fi'
import { BiBell } from 'react-icons/bi'

const DefaultLayout = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false)
    const [isShowNavigation, setIsShowNavigation] = useState(false)
    const [navigationStyle, setNavigationStyle] = useState("-translate-x-full")

    const handleOpenNavigation = () => {
        setIsShowNavigation(true)
        setTimeout(() => {
            setNavigationStyle("")
        }, 0)
    }
    const handleCloseNavigation = () => {
        setNavigationStyle("-translate-x-full")
        setTimeout(() => {
            setIsShowNavigation(false)
        }, 300)
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024)
        }

        // Attach the event listener
        window.addEventListener('resize', handleResize)

        // Call handleResize initially
        handleResize()

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className='grid grid-cols-5 bg-zinc-100'>
            {
                isMobile ?
                    (
                        isShowNavigation &&
                        <Modal>
                            <div className="w-full h-full flex">
                                <OutsideAlerter
                                    todo={handleCloseNavigation}
                                    compStyle={"w-4/5 bg-white p-4 transition duration-300 " + navigationStyle}
                                >
                                    <DefaultLayoutNav
                                        handleCloseNavigation={handleCloseNavigation}
                                    />
                                </OutsideAlerter>
                            </div>
                        </Modal>
                    ) :
                    (
                        <div className='h-screen px-6 py-4 bg-white shadow-xl overflow-y-scroll no-scrollbar'>
                            <DefaultLayoutNav
                                handleCloseNavigation={handleCloseNavigation}
                            />
                        </div>
                    )
            }
            <div className='col-span-5 lg:col-span-4'>
                <div className='flex flex-col gap-4 p-3 lg:px-6 lg:py-4 h-screen'>
                    <div className='w-full flex items-center gap-4 pt-2'>
                        <div className='flex-1'>
                            <button onClick={handleOpenNavigation} className='lg:hidden text-xl'>
                                <FiMenu />
                            </button>
                        </div>
                        <div className='flex-1 flex items-center justify-end gap-4'>
                            <button className='text-xl'>
                                <BiBell />
                            </button>
                        </div>
                    </div>
                    <div className='flex-1 bg-white rounded-md shadow-md overflow-y-scroll no-scrollbar'>
                        {children}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DefaultLayout