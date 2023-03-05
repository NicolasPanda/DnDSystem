import React, { useState } from "react";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

function CreateCharacterStepOne({ data, onChange }) {
  const [raceSwiper, setRaceSwiper] = useState(null);
  const [classSwiper, setClassSwiper] = useState(null);

  const handleRaceChange = () => {
    console.log(raceSwiper.realIndex);
  };

  const handleClassChange = () => {
    console.log(classSwiper.realIndex);
  };

  return (
    <div className="flex flex-col">
      <h2 className="w-full text-xl font-medium text-center">Race</h2>
      <div className="flex w-screen h-56">
        <Swiper
          modules={[Navigation]}
          loop={true}
          slidesPerView={1}
          navigation
          onSlideChange={handleRaceChange}
          onSwiper={setRaceSwiper}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
      </div>
      <h2 className="w-full text-xl font-medium text-center">Class</h2>
      <div className="flex w-screen h-56">
        <Swiper
          modules={[Navigation]}
          loop={true}
          slidesPerView={1}
          navigation
          onSlideChange={handleClassChange}
          onSwiper={setClassSwiper}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default CreateCharacterStepOne;
