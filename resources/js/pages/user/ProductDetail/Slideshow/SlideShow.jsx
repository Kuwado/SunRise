import React, { useState } from 'react';
import styles from './Slideshow.module.scss';

const Slideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.slideshow}>
      <button className={styles.prev} onClick={prevSlide}>
        &#10094;
      </button>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className={styles.image}
      />
      <button className={styles.next} onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Slideshow;
