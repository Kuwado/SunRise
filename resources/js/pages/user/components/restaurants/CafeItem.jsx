import React, { useState } from 'react';
import styles from './CafeItem.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import Rating from '~/components/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import config from '~/config';
const cx = classNames.bind(styles);

const CafeItem = ({
    cafe,
    id,
    image,
    name,
    location,
    price_start,
    price_end,
    distance,
    rating,
    number_reviews,
    isListView,
    open_time,
    close_time,
    isFavorited,
}) => {
    const [isFavorite, setIsFavorite] = useState(isFavorited);
    // console.log('review :', reviews);

    const handleToggleFavorite = () => {
        const user_id = localStorage.getItem('userId');
        const restaurant_id = id;
        if (isFavorite === false) {
            axios.post(`/api/favorite/create`, { user_id: user_id, restaurant_id: restaurant_id });
            // console.log(cafe.isFavorited);
            // cafe.isFavorited = true;
        } else {
            axios.delete(`/api/favorite/delete`, {
                params: { user_id: user_id, restaurant_id: restaurant_id },
            });
        }
        setIsFavorite(!isFavorite);
        // cafe.isFavorited = !isFavorite;
    };
    return (
        <>
            <Link className={cx('cafe-item', { list: isListView })}>
                {/* <Rating small rate={rating} /> */}
                <div className={cx('image-container')}>
                    <Link to={`${config.routes.user.restaurantDetail.replace(':restaurantId', id)}`}>
                        <img src={images} alt={name} className={cx('image')} />
                    </Link>
                    <div
                        className={cx('favorite-icon', { active: isFavorite })}
                        onClick={() => {
                            handleToggleFavorite();
                        }}
                    >
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                </div>
                <div className={cx('details', { list: isListView })}>
                    <h3>{name}</h3>
                    <p>{location}</p>
                    <h4>
                        {price_start}.000 đ ~ {price_end}.000 đ 以下
                    </h4>
                    <h5>{distance}km</h5>
                    {isListView && (
                        <div className={cx('wrap-time')}>
                            <p>Open: {open_time ? open_time.slice(0, 5) : ''}</p>
                            <p>Close: {close_time ? close_time.slice(0, 5) : ''}</p>
                        </div>
                    )}

                    <div className={cx('rating')}>
                        <Rating small rate={rating} />
                        <span>({number_reviews})</span>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default CafeItem;
