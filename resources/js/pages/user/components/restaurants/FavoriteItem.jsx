import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,
    faPlus,
    faEye,
    faShare,
    faHouse,
    faYenSign,
    faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import styles from './FavoriteItem.module.scss';
import images from '~/assets/images';
import Rating from '~/components/Rating';
import { AddCollectionPopup } from '../CollectionPopup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '~/config';
const cx = classNames.bind(styles);

export default function FavoriteItem({
    restaurant_id,
    id,
    image,
    name,
    location,
    price_start,
    price_end,
    rating,
    reviews,
    isListView,
    time_ago,
}) {
    const [isShowPopUp, setIsShowPopup] = useState(false);
    const [isFavorite, setIsFavorite] = useState(true);
    const handleToggleFavorite = () => {
        const user_id = localStorage.getItem('userId');
        if (isFavorite === false) {
            axios.post(`/api/favorite/create`, { user_id: user_id, restaurant_id: restaurant_id });
        } else {
            axios.delete(`/api/favorite/delete`, {
                params: { user_id: user_id, restaurant_id: restaurant_id },
            });
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <>
            {isShowPopUp && <AddCollectionPopup favorite_id={id} onClose={() => setIsShowPopup(false)} />}

            <div className={cx('favorite-item')}>
                <div className={cx('image-container')}>
                    <img src={images.restaurantItem1} alt="Cafe" className={cx('cafe-image')} />
                </div>
                <div className={cx('collection')}>
                    <div className={cx('cafe-name')}>{name}</div>
                    <div className={cx('cafe-infor')}>
                        <div className={cx('cafe-address')}>
                            <FontAwesomeIcon icon={faHouse} />
                            <span>{location}</span>
                        </div>
                        <div className={cx('cafe-price')}>
                            <FontAwesomeIcon icon={faYenSign} />
                            <span>{price_start}.000 đ 以下</span>
                        </div>
                        <div className={cx('cafe-time_save')}>
                            <FontAwesomeIcon icon={faClockRotateLeft} />
                            <span>{time_ago}</span>
                        </div>
                    </div>
                    <div className={cx('cafe-rating')}>
                        <Rating small rate={rating} />
                        <span>({reviews})</span>
                    </div>
                    <div className={cx('cafe-action')}>
                        <div className={cx('cafe-left-action')}>
                            <button className={cx('add-collection')} onClick={() => setIsShowPopup(true)}>
                                <FontAwesomeIcon icon={faPlus} />
                                <span>コレクションに追加</span>
                            </button>
                            <button
                                className={cx('share-collection')}
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        `http://127.0.0.1:8000${config.routes.user.restaurantDetail.replace(
                                            ':restaurantId',
                                            id,
                                        )}`,
                                    );
                                    alert('URLがコピーされました');
                                }}
                            >
                                <FontAwesomeIcon icon={faShare} />
                            </button>
                        </div>
                        <div className={cx('cafe-action-right')}>
                            <div
                                className={cx('favorite-icon', { active: isFavorite })}
                                onClick={() => {
                                    handleToggleFavorite();
                                }}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </div>
                            <Link to={`${config.routes.user.restaurantDetail.replace(':restaurantId', id)}`}>
                                <button className={cx('cafe-detail')}>
                                    <span>もっと見る</span>
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
