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
    id,
    image,
    name,
    location,
    price_start,
    price_end,
    rating,
    reviews,
    isListView,
    open_time,
    close_time,
}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const handleCreateFavorite = () => {
        const user_id = localStorage.getItem('userId');
        const restaurant_id = id;
        axios.post(`/api/favorite/create`, { user_id: user_id, restaurant_id: restaurant_id });
    };
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <>
            <Link className={cx('cafe-item', { list: isListView })}>
                <div className={cx('image-container')}>
                    <Link to={`${config.routes.user.restaurantDetail.replace(':restaurantId', id)}`}>
                        <img src={images.restaurantItem1} alt={name} className={cx('image')} />
                    </Link>
                    <div
                        className={cx('favorite-icon', { active: isFavorite })}
                        onClick={() => {
                            toggleFavorite();
                            handleCreateFavorite();
                        }}
                    >
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                </div>
                <div className={cx('details', { list: isListView })}>
                    <h3>{name}</h3>
                    <p>{location}</p>
                    <h4>
                        {price_start} ~ {price_end} 円以下
                    </h4>
                    {isListView && (
                        <div className={cx('wrap-time')}>
                            <p>Open: {open_time ? open_time.slice(0, 5) : ''}</p>
                            <p>Close: {close_time ? close_time.slice(0, 5) : ''}</p>
                        </div>
                    )}

                    <div className={cx('rating')}>
                        <Rating small rate={rating} />
                        <span>({reviews} レビュー)</span>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default CafeItem;
