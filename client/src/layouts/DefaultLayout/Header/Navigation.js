import { useState, useEffect } from 'react'

import { route } from '../../../routes'
import NavigationSmallScreen from './NavigationSmallScreen'
import NavigationLargeScreen from './NavigationLargeScreen'
import initNavigation from './initNavigation'

import { getAllCategory } from '../../../utils/categoryUtils'
import { FiMenu } from 'react-icons/fi'

const Index = () => {
    const [showNavigation, setShowNavigation] = useState(false)
    const [history, setHistory] = useState([initNavigation])
    const [navigationStyle, setNavigationStyle] = useState("-translate-x-full")

    const handleOpenNavigation = () => {
        setShowNavigation(true)
        setTimeout(() => {
            setNavigationStyle("translate-x-0")
        }, 0)
    }

    const handleClickNavigation = (index) => {
        const current = history[history.length - 1]

        if (!current[index].children) return
        setHistory(prev => [...prev, current[index].children])
    }

    const handleCloseNavigation = () => {
        setHistory([initNavigation])
        setNavigationStyle("-translate-x-full")
        setTimeout(() => {
            setShowNavigation(false)
        }, 300);
    }

    const handleBackNavigation = () => {
        setHistory((prev) => (prev.slice(0, -1)))
    }

    useEffect(() => {
        getAllCategory()
            .then(res => {
                initNavigation[2].children = [...res.data.data.map(category => (
                    {
                        title: category.name,
                        navigate: route.products,
                        stateName: 'category',
                        stateData: category.name  // pass data when navigate
                    }
                ))]
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            {
                showNavigation &&
                <NavigationSmallScreen
                    history={history}
                    handleCloseNavigation={handleCloseNavigation}
                    handleBackNavigation={handleBackNavigation}
                    handleClickNavigation={handleClickNavigation}
                    navigationStyle={navigationStyle}
                />
            }
            <div className="hidden lg:flex items-center gap-4 relative">
                <NavigationLargeScreen data={initNavigation} />
            </div>
            <div
                className="flex-1 lg:hidden text-2xl cursor-pointer"
                onClick={handleOpenNavigation}
            >
                <FiMenu />
            </div>
        </>
    )
}

export default Index