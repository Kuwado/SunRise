import classNames from 'classnames/bind';

import styles from './ProductDetail.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Rating from '~/components/Rating';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Slider from './Slider/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faChevronLeft,
    faClock,
    faLocation,
    faLocationArrow,
    faLocationDot,
    faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import CommentInput from './CommentInput/CommentInput';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const ProductDetail = () => {
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [reviews, setReviews] = useState([]);
    console.log(restaurant);
    console.log(reviews);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await axios.get('/api/restaurant', {
                    params: { id: restaurantId },
                });
                if (response.status === 200) {
                    setRestaurant(response.data.restaurant);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await axios.get('/api/reviews', {
                    params: { restaurant_id: restaurantId },
                });
                if (response.status === 200) {
                    setReviews(response.data.reviews);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchRestaurant();
        fetchReviews();
    }, [restaurantId]);

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };

    return (
        <>
            {restaurant && (
                <main className={cx('restaurant-detail')}>
                    <div className={cx('content')}>
                        <div className={cx('slider-box')}>
                            <div className={cx('back-btn')}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                                <span>戻る</span>
                            </div>
                            <div className={cx('line')}></div>
                            <Slider images={restaurant.media} />
                        </div>

                        <div className={cx('detail-box')}>
                            <div className={cx('name')}>{restaurant.name}</div>
                            <div className={cx('line')}></div>
                            <div className={cx('detail')}>
                                <div className={cx('detail-left')}>
                                    <div className={cx('address')}>
                                        <FontAwesomeIcon icon={faLocationDot} />
                                        <div>
                                            <span>{restaurant.address} | </span>
                                            <span className={cx('location-btn')}>
                                                <FontAwesomeIcon icon={faLocationArrow} />
                                                <span style={{ fontWeight: 600 }}>方向を取得</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className={cx('time')}>
                                        <FontAwesomeIcon icon={faClock} />
                                        <span>
                                            <span style={{ fontWeight: 600 }}>{formatTime(restaurant.open_time)}</span>{' '}
                                            AM -
                                            <span style={{ fontWeight: 600 }}>{formatTime(restaurant.close_time)}</span>{' '}
                                            PM
                                        </span>
                                    </div>

                                    <div className={cx('price')}>
                                        <FontAwesomeIcon icon={faMoneyBill} />
                                        <span>
                                            {restaurant.price_start}円~{restaurant.price_end}円
                                        </span>
                                    </div>

                                    <Rating rate={restaurant.rating} />
                                </div>

                                <div className={cx('detail-right')}>
                                    <div className={cx('description')}>
                                        <FontAwesomeIcon icon={faBars} />
                                        <span>{restaurant.description}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('line')}></div>
                        </div>

                        <CommentInput restaurantId={restaurantId} />

                        <div className={cx('comment-box')}>
                            {reviews.length > 0 &&
                                reviews.map((review, index) => (
                                    <div key={index} className={cx('comment')}>
                                        <div className={cx('comment-left')}>
                                            <img src={review.user.avarar ?? images.avatarUser} alt="avatar" />
                                        </div>
                                        <div className={cx('comment-right')}>
                                            <p className={cx('user-name')}>{review.user.name}</p>
                                            <p className={cx('user-comment')}>{review.comment}</p>
                                            <Rating rate={review.rating} />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </main>
            )}
        </>
    );
};

export default ProductDetail;
