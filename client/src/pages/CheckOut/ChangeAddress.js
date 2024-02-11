import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/Button'

const ChangeAddress = ({ addresses, currentAddress, handleCloseChangeAddress, handleChangeCurrentAddress }) => {
    const navigate = useNavigate()
    const [currenOpitonAddress, setCurrentOpitonAddress] = useState(currentAddress)

    const handleOnChangeOpitonAddress = e => {
        addresses.map(address => address._id === e.target.value && setCurrentOpitonAddress(address))
    }

    const handleChange = () => {
        handleChangeCurrentAddress(currenOpitonAddress)
        handleCloseChangeAddress()
    }

    return (
        <div className="w-11/12 lg:w-2/5 p-4 bg-white rounded-md">
            <div className="flex flex-col gap-y-4">
                <div className="flex justify-end">
                    <Button
                        title="Change Default Address"
                        onClick={() => navigate('/account/address')}
                        type="link"
                        size="lg"
                        optionStyle='flex items-center gap-2 px-0 pt-0 pb-0'
                    />
                </div>
                <div className="flex flex-col gap-y-4">
                    {
                        addresses.map(address => (
                            <div key={address._id} className="flex items-center">
                                <input
                                    type="radio"
                                    name="address"
                                    value={address._id}
                                    checked={address._id === currenOpitonAddress._id}
                                    onChange={handleOnChangeOpitonAddress}
                                />
                                <div className="flex-1 text-right">
                                    <p>{address.specificAddress}</p>
                                    <p>{address.village}, {address.district}, {address.province}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="flex items-center justify-end gap-x-4 mt-16">
                    <Button
                        title="Cancel"
                        onClick={handleCloseChangeAddress}
                        type="outline"
                        size="md"
                    />
                    <Button
                        title="Change"
                        onClick={handleChange}
                        type="success"
                        size="md"
                    />
                </div>
            </div>
        </div>
    )
}

export default ChangeAddress