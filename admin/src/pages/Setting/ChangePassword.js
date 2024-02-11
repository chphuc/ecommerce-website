import Input from '../../components/Input'

const ChangePassword = ({ dataPassword, handleChangeDataPassword }) => {
    return (
        <div className='flex flex-col gap-4 p-4'>
            <div className='flex flex-col gap-4'>
                <p className='font-medium'>Current password</p>
                <Input
                    type='password'
                    name='currentPassword'
                    value={dataPassword.currentPassword}
                    onChange={handleChangeDataPassword}
                />
            </div>
            <div className='flex flex-col gap-4'>
                <p className='font-medium'>New password</p>
                <Input
                    type='password'
                    name='newPassword'
                    value={dataPassword.newPassword}
                    onChange={handleChangeDataPassword}
                />
            </div>
            <div className='flex flex-col gap-4'>
                <p className='font-medium'>Repeat new password</p>
                <Input
                    type='password'
                    name='repeatNewPassword'
                    value={dataPassword.repeatNewPassword}
                    onChange={handleChangeDataPassword}
                />
            </div>
        </div>
    )
}

export default ChangePassword