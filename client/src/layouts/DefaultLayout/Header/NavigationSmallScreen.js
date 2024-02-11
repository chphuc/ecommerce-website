import { Link } from 'react-router-dom'

import { route } from '../../../routes'
import OutsideAlerter from '../../../components/OutsideAlerter'
import Modal from '../../../components/Modal'

import { AiOutlineArrowLeft } from 'react-icons/ai'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'


const NavigationLargeScreen = ({ history, handleCloseNavigation, handleBackNavigation, handleClickNavigation, navigationStyle }) => {
    return (
        <Modal>
            <OutsideAlerter
                todo={handleCloseNavigation}
                compStyle={"absolute top-0 left-0 w-10/12 h-full bg-white p-4 transition duration-300 " + (history.length <= 1 && "py-4") + navigationStyle}
            >
                <div className="flex flex-col gap-4">
                    {
                        history.length > 1 &&
                        <div
                            className="flex items-center gap-2 font-medium cursor-pointer"
                            onClick={handleBackNavigation}
                        >
                            <AiOutlineArrowLeft />
                            <p>Back</p>
                        </div>
                    }
                    <div className="flex flex-col gap-4">
                        {
                            history[history.length - 1].map((item, index) => (
                                <div key={item.title} className={'flex items-center ' + (!item.navigate && 'text-gray-400')}>
                                    <div>
                                        {
                                            item.navigate ?
                                                <Link
                                                    to={item.navigate || route.home}
                                                >
                                                    <p>{item.title}</p>
                                                </Link>
                                                :
                                                <p>{item.title}</p>
                                        }
                                    </div>
                                    <div
                                        onClick={() => handleClickNavigation(index)}
                                        className="flex-1 justify-end flex cursor-pointer"
                                    >

                                        {item.children && <MdOutlineKeyboardArrowRight className="text-xl" />}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </OutsideAlerter>
        </Modal >
    )
}

export default NavigationLargeScreen