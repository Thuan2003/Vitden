// SimpleSlider.js

import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import styles from './SimpleSlider.module.css'; // Import the CSS module

export default function SimpleSlider() {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.sliderContainer}>
      <Slider ref={sliderRef} {...settings}>
        <div className={styles.slideItem}>
          <img src="https://teddy.vn/wp-content/uploads/2023/11/thang-11_Banner-Web-1.jpg" alt="Slide 1" className={styles.slideImage} />
        </div>
        <div className={styles.slideItem}>
          <img src="https://teddy.vn/wp-content/uploads/2022/08/Banner-teddy-2.jpg" alt="Slide 2" className={styles.slideImage} />
        </div>
        <div className={styles.slideItem}>
          <img src="https://ngoinhagaubong.com/wp-content/uploads/2023/03/z4171424398797_c5e6cba7c73ad640b48bc78053e95585.jpg" alt="Slide 3" className={styles.slideImage} />
        </div>
        <div className={styles.slideItem}>
          <img src="https://ngoinhagaubong.com/wp-content/uploads/2023/03/z4171424382695_6aa249facc3ef4c73d718fb9787a2695.jpg" alt="Slide 4" className={styles.slideImage} />
        </div>
        <div className={styles.slideItem}>
          <img src="https://ngoinhagaubong.com/wp-content/uploads/2023/03/z4171424389203_28816063595e9335aa46f4aed97fd3bb.jpg" alt="Slide 5" className={styles.slideImage} />
        </div>
        <div className={styles.slideItem}>
          <img src="https://ngoinhagaubong.com/wp-content/uploads/2019/08/02-copy.jpg" alt="Slide 6" className={styles.slideImage} />
        </div>
      </Slider>
    </div>
  );
}
