import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faTrashCan, faPen, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import images from '~/assets/images';
import Dropdown from '~/components/Dropdown';
import Rating from '~/components/Rating';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Favorite.module.scss';
import HeaderFavorite from '../components/header/HeaderFavorite';
import RadioInput from '~/components/radio';
import FavoriteItem from '../components/restaurants/FavoriteItem';
import { AddCollectionPopup } from '../components/CollectionPopup';
const cx = classNames.bind(styles);
export default function Favorite() {
    const [types, setTypes] = useState([]);

    const [priceRange, setPriceRange] = useState({ start: null, end: null });
    const [priceType, setPriceType] = useState();
    const [products, setProducts] = useState([]);
    const [totalPriceProducts, setTotalPriceroducts] = useState([]);

    const handleClearFilter = () => {};

    const handlePriceTypeChange = (typeId) => {
        if (typeId === priceType) {
            setPriceRange({ start: null, end: null });
            setPriceType(0);
        } else {
            switch (typeId) {
                case 1:
                    setPriceRange({ start: null, end: user.price_start });
                    break;
                case 2:
                    setPriceRange({ start: user.price_start, end: user.price_end });
                    break;
                case 3:
                    setPriceRange({ start: user.price_end, end: null });
                    break;
                case 4:
                    setPriceRange({ start: user.price_end, end: null });
            }
            setPriceType(typeId);
        }
        setCurrentPage(1);
    };

    return (
        <>
            {/* <HeaderFavorite /> */}
            <div className={cx('favoriteRestaurant')}>
                <div className={cx('banner')}>
                    <img src={images.headerFindRestaurant} alt="Restaurant Banner" />
                    <h1>あなたのお気に入りのカフェが一挙に。</h1>
                </div>
                <div className={cx('filters-container')}>
                    <div className={cx('filters-left')}>
                        <h4>フィルター</h4>
                        <a onClick={() => handleClearFilter()} href="#">
                            <FontAwesomeIcon icon={faRedo} />
                            フィルターをクリア
                        </a>
                    </div>
                    <div className={cx('name-collection')}> コレクション A</div>
                    <div className={cx('filters-right')}>
                        <FontAwesomeIcon icon={faTrashCan} className={cx('view-icon')} />
                        <span>消去</span>
                        <FontAwesomeIcon icon={faPen} className={cx('view-icon')} />
                        <span>編集</span>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('filter')}>
                        <div className={cx('filter-option')}>
                            <h3>私のコレクション</h3>
                            <RadioInput id="1" checked={priceType === 1} onChange={() => handlePriceTypeChange(1)}>
                                すべての「いいね({totalPriceProducts[1]})
                            </RadioInput>
                            <RadioInput id="2" checked={priceType === 2} onChange={() => handlePriceTypeChange(2)}>
                                コレクション A({totalPriceProducts[2]})
                            </RadioInput>
                            <RadioInput id="3" checked={priceType === 3} onChange={() => handlePriceTypeChange(3)}>
                                コレクション B({totalPriceProducts[3]})
                            </RadioInput>
                            <RadioInput id="4" checked={priceType === 4} onChange={() => handlePriceTypeChange(4)}>
                                コレクション C({totalPriceProducts[4]})
                            </RadioInput>
                        </div>
                        <Dropdown
                            title="並べ替え 評価: 低から高"
                            width="width=227px"
                            // setValue={setFilterDrPrice}
                            // selected={filterDrPrice}
                            // handleClick={handleSortPrice}
                        >
                            <div>並べ替え 評価: 低から高</div>
                            <div>並べ替え 評価: 高から低</div>
                        </Dropdown>
                        <div className={cx('filter-option')} style={{ marginTop: '20px' }}>
                            <h3>価格（円）</h3>
                            <RadioInput id="1" checked={priceType === 1} onChange={() => handlePriceTypeChange(1)}>
                                安い({totalPriceProducts[1]})
                            </RadioInput>
                            <RadioInput id="2" checked={priceType === 2} onChange={() => handlePriceTypeChange(2)}>
                                手頃な価格({totalPriceProducts[2]})
                            </RadioInput>
                            <RadioInput id="3" checked={priceType === 3} onChange={() => handlePriceTypeChange(3)}>
                                高い({totalPriceProducts[3]})
                            </RadioInput>
                            <RadioInput id="4" checked={priceType === 4} onChange={() => handlePriceTypeChange(4)}>
                                高価なものはすべて({totalPriceProducts[4]})
                            </RadioInput>
                        </div>
                    </div>

                    <div className={cx('favorite-list')}>
                        <FavoriteItem />
                        <FavoriteItem />
                        <FavoriteItem />
                        <FavoriteItem />
                    </div>
                </div>
            </div>
        </>
    );
}
