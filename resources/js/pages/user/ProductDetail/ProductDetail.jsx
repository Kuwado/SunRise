import classNames from 'classnames/bind';

import styles from './ProductDetail.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    faDoorOpen,
    faLocation,
    faLocationArrow,
    faLocationDot,
    faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import CommentInput from './CommentInput/CommentInput';
import images from '~/assets/images';
import { CustomInput } from '~/components/Input';
import config from '~/config';

const cx = classNames.bind(styles);

const ProductDetail = () => {
    const navigate = useNavigate();
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [reviews, setReviews] = useState([]);

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

    useEffect(() => {
        fetchRestaurant();
        fetchReviews();
    }, [restaurantId]);

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JS bắt đầu từ 0
        const year = date.getFullYear();

        return `${hours}:${minutes} ${day}-${month}-${year}`;
    };

    const handleComment = () => {
        fetchRestaurant();
        fetchReviews();
    };

    return (
        <>
            {restaurant && (
                <main className={cx('restaurant-detail')}>
                    <div className={cx('content')}>
                        <div className={cx('slider-box')}>
                            <div className={cx('back-btn')} onClick={() => navigate(-1)}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                                <span>戻る</span>
                            </div>
                            <div className={cx('line')}></div>
                            <Slider medias={restaurant.media ?? []} />
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
                                            <span
                                                className={cx('location-btn')}
                                                onClick={() =>
                                                    navigate(
                                                        `${config.routes.user.map}?lng=${restaurant.longitude}&lat=${restaurant.latitude}`,
                                                    )
                                                }
                                            >
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

                                    <div className={cx('style')}>
                                        <FontAwesomeIcon icon={faDoorOpen} />
                                        {restaurant.styles.length > 0 &&
                                            restaurant.styles.map((style, index) => (
                                                <span key={index}>
                                                    {style}
                                                    {index < restaurant.styles.length - 1 && <span>, </span>}
                                                </span>
                                            ))}
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

                        <CommentInput restaurantId={restaurantId} onUpload={handleComment} />

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
                                            {review.image && (
                                                <img
                                                    className={cx('image-commnet')}
                                                    src={review.image}
                                                    alt="img-commnet"
                                                />
                                            )}
                                            <p className={cx('user-time')}>{formatDateTime(review.created_at)}</p>
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
