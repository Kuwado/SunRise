import classNames from 'classnames/bind';
import Comment from './Comment'; // Không cần ngoặc nhọn
import SlideShow from './Slideshow';

import styles from './ProductDetail.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Rating from '~/components/Rating';

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

    const formatTime = ($time) => {
        return $time;
    };

    return (
        <div>
            {restaurant && (
                <main className={cx('main')}>
                    {/* Image Slider */}
                    <div className={styles.imageSlider}>
                        <img src="https://via.placeholder.com/1000x400" alt="Cafe Interior" />
                    </div>

                    {/* Cafe Details */}
                    <section className={styles.details}>
                        <h2 className={cx('cafe-name')}>{restaurant.name}</h2>
                        <p className={styles.address}>{restaurant.address}</p>
                        <p className={styles.hours}>
                            {formatTime(restaurant.open_time)} AM - {formatTime(restaurant.close_time)} PM
                        </p>
                        <p className={styles.price}>
                            {restaurant.price_start}円~{restaurant.price_end}円
                        </p>
                        <Rating rate={restaurant.rating} />
                        <p className={styles.description}>{restaurant.description}</p>
                    </section>

                    {/* Comments Section */}
                    <section className={styles.comments}>
                        <h3>レビュー</h3>
                        {reviews.length > 0 &&
                            reviews.map((review, index) => (
                                <div key={index} className={styles.comment}>
                                    <p className={styles.username}>{review.user.name}</p>
                                    <p className={styles.userComment}>{review.comment}</p>
                                    <Rating rate={review.rating} />
                                </div>
                            ))}
                    </section>
                </main>
            )}
        </div>
    );
};

export default ProductDetail;
