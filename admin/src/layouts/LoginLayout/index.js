import React from 'react'

const index = ({ children }) => {
    return (
        <div className='h-screen flex'>
            <div className='h-full flex-1'>
                {children}
            </div>
            <div className='hidden lg:block h-full flex-1 bg-center bg-cover bg-no-repeat' style={{ backgroundImage: 'url(https://preview.keenthemes.com/metronic8/demo1/assets/media/misc/auth-bg.png)' }}>
                <div className='h-full flex flex-col items-center justify-center gap-y-4'>
                    <img className='w-28' alt='logo' src='https://preview.keenthemes.com/metronic8/demo1/assets/media/logos/custom-1.png' />
                    <div className='px-20'>
                        <img alt='' src='https://preview.keenthemes.com/metronic8/demo1/assets/media/misc/auth-screens.png' />
                    </div>
                    <p className='text-2xl text-white font-medium'>Fast, Efficient and Productive</p>
                </div>
            </div>
        </div>
    )
}

export default index