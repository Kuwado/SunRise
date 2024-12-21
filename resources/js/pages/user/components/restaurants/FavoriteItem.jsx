import React from 'react';
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
const cx = classNames.bind(styles);

export default function FavoriteItem() {
    return (
        <div className={cx('favorite-item')}>
            <div className={cx('image-container')}>
                <img src={images.restaurantItem1} alt="Cafe" className={cx('cafe-image')} />
            </div>
            <div className={cx('collection')}>
                <div className={cx('cafe-name')}>カフェA</div>
                <div className={cx('cafe-infor')}>
                    <div className={cx('cafe-address')}>
                        <FontAwesomeIcon icon={faHouse} />
                        <span>道路A | B地区</span>
                    </div>
                    <div className={cx('cafe-price')}>
                        <FontAwesomeIcon icon={faYenSign} />
                        <span>600 以下</span>
                    </div>
                    <div className={cx('cafe-time_save')}>
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                        <span>2日前に保存</span>
                    </div>
                </div>
                <div className={cx('cafe-rating')}>
                    <Rating small rate={4} />
                    <span>(1897 reviews)</span>
                </div>
                <div className={cx('cafe-action')}>
                    <div className={cx('cafe-left-action')}>
                        <button className={cx('add-collection')}>
                            <FontAwesomeIcon icon={faPlus} />
                            <span>コレクションに追加</span>
                        </button>
                        <button className={cx('share-collection')}>
                            <FontAwesomeIcon icon={faShare} />
                        </button>
                    </div>
                    <div className={cx('cafe-action-right')}>
                        <div className={cx('favorite-icon')}>
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                        <button className={cx('cafe-detail')}>
                            <span>もっと見る</span>
                            <FontAwesomeIcon icon={faEye} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
