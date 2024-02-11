import { useState, useEffect } from 'react'
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getAllCategory } from '../../utils/categoryUtils'
import HomeCollectionItem from './HomeCollectionItem';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const HomeCollection = () => {
    const [dataCategory, setDataCategory] = useState([])

    useEffect(() => {
        getAllCategory()
            .then(res => setDataCategory(res.data.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <p className="text-3xl mb-10">Season Collection</p>
            <Swiper
                modules={[Pagination]}
                spaceBetween={30}
                breakpoints={{
                    370: {
                        slidesPerView: 1.2,
                    },
                    768: {
                        slidesPerView: 5,
                    },
                }}
            >
                {
                    dataCategory.map(item => (
                        <SwiperSlide key={item.name}>
                            <HomeCollectionItem data={item} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default HomeCollection