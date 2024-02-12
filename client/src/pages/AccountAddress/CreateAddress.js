import { useState, useEffect } from 'react'
import axios from 'axios'

import Select from "../../components/Select"
import Button from "../../components/Button"
import Textarea from '../../components/Textarea'
import Input from '../../components/Input'

const ModalAddAddress = ({ handleCloseModalAdd, handleCreateAddress }) => {
    const [provinceList, setProvinceList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [villageList, setVillageList] = useState([])
    const [data, setData] = useState({
        province: '',
        district: '',
        village: '',
    })
    const [specificAddress, setSpecificAddress] = useState('')
    const [isDefaultAddress, setIsDefaultAddress] = useState(false)

    const handleFetchDisTric = (provinceCode) => {
        axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
            .then(res => {
                setDistrictList(res.data.districts.map(item => ({ code: item.code, name: item.name })))
            })
            .catch(err => console.log(err))
    }

    const handleFetchVillage = (districtCode) => {
        if (districtCode === -1) return setVillageList([])

        axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
            .then(res => setVillageList(res.data.wards.map(item => ({ code: item.code, name: item.name }))))
            .catch(err => console.log(err))
    }

    const handleOnChangeSelect = e => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

        if (e.target.name == 'province') {
            provinceList.map(item => {
                if (item.name === e.target.value) {
                    handleFetchDisTric(item.code)
                    handleFetchVillage(-1)
                    setData(prev => ({ ...prev, district: '', village: '' }))
                }
            })
        }
        else if (e.target.name == 'district') {
            districtList.map(item => {
                if (item.name === e.target.value) {
                    handleFetchVillage(item.code)
                    setData(prev => ({ ...prev, village: '' }))

                }
            })
        }
    }

    const handleClickCreate = () => {
        handleCreateAddress({ ...data, specificAddress, isDefaultAddress })
    }

    useEffect(() => {
        axios.get('https://provinces.open-api.vn/api/p/')
            .then(res => {
                let provinces = res.data.map(item => {
                    return {
                        code: item.code,
                        name: item.name
                    }
                })
                setProvinceList(provinces)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="w-11/12 lg:w-2/5 flex flex-col gap-y-4 p-6 bg-white rounded-md">
            <div>
                <p className="text-xl">New Address</p>
            </div>
            {/* <div className="flex flex-wrap items-center gap-4">
                <div className="basis-full lg:flex-1">
                    <p className="mb-1 text-sm font-medium">Province</p>
                    <Select name="province" value={data.province} options={provinceList} onChange={handleOnChangeSelect} />
                </div>
                <div className="basis-full lg:flex-1">
                    <p className="mb-1 text-sm font-medium">District</p>
                    <Select name="district" value={data.district} options={districtList} onChange={handleOnChangeSelect} />
                </div>
                <div className="basis-full lg:flex-1">
                    <p className="mb-1 text-sm font-medium">Ward</p>
                    <Select name="village" value={data.village} options={villageList} onChange={handleOnChangeSelect} />
                </div>
            </div> */}
            <div>
                <label className="w-1/5 text-gray-700 text-sm font-bold">
                    Province
                </label>
                <Input
                    type="text"
                    value={data.province}
                    onChange={(e) => { setData(prev => ({ ...prev, province: e.target.value })) }}
                />
            </div>
            <div>
                <label className="w-1/5 text-gray-700 text-sm font-bold">
                    District
                </label>
                <Input
                    type="text"
                    value={data.district}
                    onChange={(e) => { setData(prev => ({ ...prev, district: e.target.value })) }}
                />
            </div>
            <div>
                <label className="w-1/5 text-gray-700 text-sm font-bold">
                    Village
                </label>
                <Input
                    type="text"
                    value={data.village}
                    onChange={(e) => { setData(prev => ({ ...prev, village: e.target.value })) }}
                />
            </div>
            <div>
                <p className="mb-1 text-sm font-medium">Specific Address</p>
                <Textarea
                    rows="3"
                    value={specificAddress}
                    onChange={e => setSpecificAddress(e.target.value)}

                />
            </div>
            <div className="flex items-center gap-x-4">
                <input
                    type="checkbox"
                    checked={isDefaultAddress}
                    onChange={() => setIsDefaultAddress((prev) => (!prev))}
                />
                <p>Set default address</p>
            </div>
            <div className="flex items-center justify-end gap-x-4">
                <Button
                    title="Cancel"
                    onClick={handleCloseModalAdd}
                    type="outline"
                    size="md"
                />
                <Button
                    title="Create"
                    onClick={handleClickCreate}
                    type="success"
                    size="md"
                />
            </div>
        </div>
    )
}

export default ModalAddAddress