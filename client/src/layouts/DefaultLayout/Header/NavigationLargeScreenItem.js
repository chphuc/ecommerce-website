import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'

import { route } from '../../../routes'
import { BsChevronDown } from 'react-icons/bs'

const NavBarItem = ({ data }) => {

    return (
        <Tippy
            interactive
            placement="bottom-start"
            render={() => (
                <div>
                    {
                        !data.fullWidth ?
                            <div className="flex flex-col p-4 shadow-md bg-white">
                                {
                                    data.children?.map(item => (
                                        <Link
                                            key={item.title}
                                            to={item.navigate || route.home}
                                            state={{ [item.stateName]: item.stateData }}
                                            className={" " + (!item.navigate && "text-gray-400")}
                                        >
                                            <div className="px-3 py-2 hover:bg-gray-100">
                                                {item.title}
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                            :
                            <div className="relative -left-2 w-screen shadow-md bg-white px-16 pt-5 pb-12">
                                <div className="flex">
                                    <div className="flex-1 flex">
                                        {
                                            data.children?.map(col => (
                                                <div key={col.title} className="flex-1">
                                                    {
                                                        col.children?.map(row => (
                                                            <Link
                                                                to={row.navigate || route.home}
                                                                key={row.title}
                                                                className="flex py-2 px-3 cursor-pointer text-gray-400 hover:bg-gray-100"
                                                            >
                                                                <p>{row.title}</p>
                                                                {row.description && row.description === 'hot' && <span className="relative left-2 bottom-2 px-2 bg-orange-500 text-white text-sm rounded-lg">{row.description}</span>}
                                                                {row.description && row.description === 'new' && <span className="relative left-2 bottom-2 px-2 bg-purple-500 text-white text-sm rounded-lg">{row.description}</span>}
                                                            </Link>
                                                        ))
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    {
                                        data.moreInfomation &&
                                        <div className='w-1/3'>
                                            {data.moreInfomation}
                                        </div>
                                    }
                                </div>
                            </div>
                    }
                </div>
            )}
        >
            <div className="flex items-center cursor-pointer">
                <Link
                    to={data.navigate || route.home}
                    className={"font-medium " + (!data.navigate && "text-gray-400")}
                >
                    {data.title}
                </Link>
                <div className="px-2">
                    <BsChevronDown className="w-2" />
                </div>
            </div>
        </Tippy>
    )
}

export default NavBarItem