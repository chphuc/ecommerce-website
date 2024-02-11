import { useState, useEffect } from 'react'
import Tippy from '@tippyjs/react/headless'

import { getAllUser } from '../../utils/UserUtils'
import { getRoles } from '../../utils/RoleUtils'
import CustomerTable from './CustomerTable'
import CustomerDetail from './CustomerDetail'
import SearchComponent from '../../components/Search'
import CheckBoxComponent from '../../components/CheckBox'
import Modal from '../../components/Modal'
import OutsideAlerter from '../../components/OutsideAlerter'
import Pagination from '../../components/Pagination'
import Button from '../../components/Button'

import { FiFilter } from "react-icons/fi";

const Index = () => {
    const [originalData, setOriginalData] = useState([])
    const [data, setData] = useState([])
    const [role, setRole] = useState([])
    const [filters, setFilters] = useState({
        role: [],
    })
    const [showFilter, setShowFilter] = useState(false)
    const [search, setSearch] = useState('')
    const limit = 10
    const [page, setPage] = useState(1)
    const [currentCustomer, setCurrentCustomer] = useState('')
    const [showDetail, setShowDetail] = useState(false)

    const handleOpenDetail = () => {
        setShowDetail(true)
    }

    const handleCloseDetail = () => {
        setShowDetail(false)
    }

    const handleClickViewCustomer = id => {
        setCurrentCustomer(id)
        handleOpenDetail()
    }

    const handleChangeSearch = e => {
        setSearch(e.target.value)
    }

    const handleChangePage = (page) => {
        setPage(page)
    }

    const getCurrentUserPage = () => {
        return data.length <= limit ? data : data.slice((page - 1) * limit, page * limit)
    }

    const getStateCheckBox = (name, value) => {
        return filters[name].includes(value)
    }

    const handleChangeCheckBox = e => {
        if (e.target.checked) {
            setFilters((prev) => ({
                ...prev,
                [e.target.name]: [...prev[e.target.name], e.target.value]
            }))
        }
        else {
            setFilters((prev) => ({
                ...prev,
                [e.target.name]: [...prev[e.target.name].filter(item => item !== e.target.value)]
            }))
        }
    }

    const handleClearFilters = () => {
        setFilters({
            role: []
        })
    }

    useEffect(() => {
        getAllUser()
            .then(res => {
                setOriginalData(res.data.data)
                setData(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        getRoles()
            .then(res => setRole(res.data.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        setData((prev) => {
            const newData = originalData.filter(item => {
                if (!item.userName.includes(search)) return false
                for (const key in filters) {
                    if (filters[key].length) {
                        if (!filters[key].includes(item[key])) return false
                    }
                }
                return true
            })
            return newData
        })
    }, [filters, search])

    return (
        <>
            {
                showDetail &&
                <Modal>
                    <OutsideAlerter
                        todo={handleCloseDetail}
                        compStyle={"w-11/12 lg:w-3/5 h-5/6 p-4 bg-white rounded-md shadow-md overflow-y-scroll no-scrollbar"}
                    >
                        <CustomerDetail
                            currentCustomer={currentCustomer}
                            handleCloseDetail={handleCloseDetail}
                        />
                    </OutsideAlerter>
                </Modal>
            }
            <div className='h-full flex flex-col justify-between gap-4 p-2 lg:px-6 lg:py-4'>
                <div className='flex flex-wrap-reverse items-center justify-between gap-2'>
                    <div>
                        <p>View User: <span className='font-medium'>{getCurrentUserPage().length}/{data.length}</span></p>
                    </div>
                    <div className='flex basis-full lg:basis-auto items-center gap-x-4'>
                        <div className='flex-1'>
                            <SearchComponent title='Search Username' value={search} onChange={handleChangeSearch} />
                        </div>
                        <Tippy
                            interactive={true}
                            visible={showFilter}
                            placement='bottom-end'
                            onClickOutside={() => setShowFilter(false)}
                            render={() => (
                                <div className='px-4 py-3 border rounded bg-white shadow' style={{ minWidth: '200px' }}>
                                    <div className='flex items-center justify-between'>
                                        <p className='font-medium'>Filters</p>
                                        <Button
                                            title='Clear All'
                                            type='none'
                                            onClick={handleClearFilters}
                                            optionStyle='px-0 text-blue-700 underline active:text-blue-500 shadow-none'
                                        />
                                    </div>
                                    <div className='mt-2 overflow-y-scroll no-scrollbar' style={{ maxHeight: '300px' }}>
                                        <div>
                                            <p className='mb-2'>Role</p>
                                            {
                                                role.map((item, index) => (
                                                    <CheckBoxComponent key={index} name='role' value={item.name} checked={getStateCheckBox('role', item.name)} onChange={handleChangeCheckBox} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                        >
                            <button onClick={() => setShowFilter((prev) => (!prev))} className='flex items-center gap-x-2 px-3 py-1 border border-gray-300 rounded-md'>
                                <p>Filter</p>
                                <FiFilter />
                            </button>
                        </Tippy>
                    </div>
                </div>
                <div className='flex-1'>
                    <CustomerTable
                        data={getCurrentUserPage()}
                        handleClickViewCustomer={handleClickViewCustomer}
                    />
                </div>
                {
                    data.length > limit &&
                    <div className='flex justify-end pb-4 lg:pb-0'>
                        <Pagination
                            currentPage={page}
                            totalPages={Math.ceil(data.length / limit)}
                            handleClick={handleChangePage}
                        />
                    </div>
                }
            </div>
        </>
    )
}

export default Index