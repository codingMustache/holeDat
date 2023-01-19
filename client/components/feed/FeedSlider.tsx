import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper";
import { Link } from "react-router-dom";
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/bundle';

const FeedSlider = ({ globalFeed, userObj, badgeObj }) => {

    //[users, setUsers] = useState()

    return (
        <Swiper
            id='swiper'
            loop={true}
            grabCursor={true}
            modules={[Pagination, Mousewheel]}
            mousewheel={true}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className='mySwiper'
            autoplay={{
                delay: 3000,
                disableOnInteraction: true,
            }}
            style={{ width: '100vh' }}
        >
            {globalFeed.map((image) => {
                return (
                    <SwiperSlide
                        key={image.image_id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '18px',
                        }}
                    >

                        <Link to={`/Pothole:${image.pothole_id}`}>

                            <img style={{ borderRadius: '18px', objectFit: "contain", height: '200px', width: '200px' }} src={image.photoURL} width='40%' />
                        </Link>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    )
}
export default FeedSlider