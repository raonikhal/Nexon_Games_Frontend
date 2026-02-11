// Components/HomeCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import bannerData from "./bannerData";

const HomeCarousel = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      pagination={{ clickable: true }}
      navigation
      className="homeSwiper"
    >
      {bannerData.map((item) => (
        <SwiperSlide key={item.id}>
          <img src={item.image} alt={item.title} style={{ width: "100%", height: "auto", objectFit: "fit" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeCarousel;
