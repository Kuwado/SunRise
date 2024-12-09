import React, { useState } from 'react';
import styles from './CafeItem.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import Rating from '~/components/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const CafeItem = ({ image, name, location, priceRange, rating, reviews }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={cx('cafe-item')}>
            <div className={cx('image-container')}>
                <img src={image} alt={name} className={cx('image')} />
                <div className={cx('favorite-icon', { active: isFavorite })} onClick={toggleFavorite}>
                    <FontAwesomeIcon icon={faHeart} />
                </div>
            </div>
            <div className={cx('details')}>
                <h3>{name}</h3>
                <p>{location}</p>
                <h4>{priceRange}</h4>
                <div className={cx('rating')}>
                    <Rating small rate={rating} />
                    <span>({reviews} レビュー)</span>
                </div>
            </div>
        </div>
    );
};

export default CafeItem;
