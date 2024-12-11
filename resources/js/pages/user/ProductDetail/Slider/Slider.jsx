import classNames from 'classnames/bind';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import styles from './Slider.module.scss';
import './Carousel.scss';

const cx = classNames.bind(styles);

const responsive = {
    desktop: {
        breakpoint: { max: 4000, min: 1280 },
        items: 1,
    },
    laptop: {
        breakpoint: { max: 1280, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 1,
    },
    minitablet: {
        breakpoint: { max: 768, min: 480 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 480, min: 0 },
        items: 1,
    },
};

const Slider = ({ images = [] }) => {
    return (
        <div className={cx('slider')}>
            <Carousel
                responsive={responsive}
                infinite={true}
                showDots={true}
                keyBoardControl={true}
                removeArrowOnDeviceType={['minitablet', 'mobile']}
            >
                {images.length > 0 &&
                    images.map((item, index) => (
                        <div key={`image-${index}`} className={cx('slider-item')}>
                            <img src={item} alt="item" />
                        </div>
                    ))}
            </Carousel>
        </div>
    );
};

export default Slider;
