import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CustomSwiper.css";

// Import Swiper modules
import { Navigation, Pagination } from "swiper/modules";

const CustomSwiper: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Track current slide index
  const swiperRef = useRef<any>(null); // To reference the Swiper instance

  const updateNavButtonsVisibility = (swiper: any) => {
    const prevButton = document.querySelector(".swiper-button-prev");
    const nextButton = document.querySelector(".swiper-button-next");

    if (swiper.activeIndex === 0) {
      prevButton?.classList.add("swiper-button-hidden");
    } else {
      prevButton?.classList.remove("swiper-button-hidden");
    }

    if (swiper.activeIndex === 2) { // Update this index if you add more slides
      nextButton?.classList.add("swiper-button-hidden");
    } else {
      nextButton?.classList.remove("swiper-button-hidden");
    }
  };

  // Update navigation button visibility when the component mounts or when the slide changes
  useEffect(() => {
    if (swiperRef.current) {
      updateNavButtonsVisibility(swiperRef.current.swiper);
    }
  }, [currentIndex]);

  return (
    <div className="swiper-container">
      <Swiper
        ref={swiperRef}
        slidesPerView={1.5} // Show part of the next slide
        centeredSlides={true} // Center the current slide
        spaceBetween={50} // Space between slides
        grabCursor={true}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.activeIndex);
          updateNavButtonsVisibility(swiper);
        }}
        navigation={true} // Enable built-in navigation
        pagination={{ clickable: true }} // Add pagination dots
        modules={[Navigation, Pagination]}
        loop={false} // Disable loop
        className="mySwiper"
      >
        <SwiperSlide
          style={{
            zIndex: 3,
            transform: `scale(${currentIndex === 0 ? 1 : 0.8})`, // Adjust scale for current slide
            opacity: currentIndex === 0 ? 1 : 0.5,
            transition: "transform 0.5s, opacity 0.5s",
          }}
        >
          <div className="slide-content">
            <img
              src="https://via.placeholder.com/1200x600.png?text=Slide+1"
              alt="Slide 1"
              className="slide-image"
            />
            <div className="slide-text">
              <h2>Slide 1</h2>
              <p>This is the first slide description</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            zIndex: 2,
            transform: `scale(${currentIndex === 1 ? 1 : 0.8})`, // Adjust scale for current slide
            opacity: currentIndex === 1 ? 1 : 0.5,
            transition: "transform 0.5s, opacity 0.5s",
          }}
        >
          <div className="slide-content">
            <img
              src="https://via.placeholder.com/1200x600.png?text=Slide+2"
              alt="Slide 2"
              className="slide-image"
            />
            <div className="slide-text">
              <h2>Slide 2</h2>
              <p>This is the second slide description</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            zIndex: 1,
            transform: `scale(${currentIndex === 2 ? 1 : 0.8})`, // Adjust scale for current slide
            opacity: currentIndex === 2 ? 1 : 0.5,
            transition: "transform 0.5s, opacity 0.5s",
          }}
        >
          <div className="slide-content">
            <img
              src="https://via.placeholder.com/1200x600.png?text=Slide+3"
              alt="Slide 3"
              className="slide-image"
            />
            <div className="slide-text">
              <h2>Slide 3</h2>
              <p>This is the third slide description</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CustomSwiper;
