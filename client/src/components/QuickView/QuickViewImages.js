import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

const QuickViewImages = ({ data }) => {
    return (
        <Swiper
            pagination={{
                type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="w-full h-full"
        >
            {
                data?.map(image => (
                    <SwiperSlide key={image} className="h-full bg-center bg-cover" style={{ backgroundImage: `url(${image})` }} />
                ))
            }
        </Swiper>
    )
}

export default QuickViewImages