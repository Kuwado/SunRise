import React, { useState } from 'react';
import HeaderUser from '../components/header/HeaderUser';
import CafeItem from '../components/restaurants/CafeItem';
import styles from './FindRestaurant.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { DefaultInput } from '~/components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRedo, faThLarge, faBars } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '~/components/Dropdown';
import { CheckboxInput } from '~/components/Checkbox';
import Rating from '~/components/Rating';
const cx = classNames.bind(styles);

const FindRestaurant = () => {
    const [cafes, setCafes] = useState([
        {
            image: images.restaurantItem1,
            name: 'Anchor & James',
            location: 'American | Downtown Union Street',
            priceRange: '300円以下',
            rating: 4.5,
            reviews: 1897,
        },
        {
            image: images.restaurantItem1,
            name: 'Anchor & James',
            location: 'American | Downtown Union Street',
            priceRange: '500円以上',
            rating: 4.0,
            reviews: 1597,
        },
        {
            image: images.restaurantItem1,
            name: 'Anchor & James',
            location: 'American | Downtown Union Street',
            priceRange: '500円以上',
            rating: 4.0,
            reviews: 1597,
        },
        {
            image: images.restaurantItem1,
            name: 'Anchor & James',
            location: 'American | Downtown Union Street',
            priceRange: '500円以上',
            rating: 4.0,
            reviews: 1597,
        },
        {
            image: images.restaurantItem1,
            name: 'Anchor & James',
            location: 'American | Downtown Union Street',
            priceRange: '500円以上',
            rating: 4.0,
            reviews: 1597,
        },
        {
            image: images.restaurantItem1,
            name: 'Anchor & James',
            location: 'American | Downtown Union Street',
            priceRange: '500円以上',
            rating: 4.0,
            reviews: 1597,
        },
        // Thêm dữ liệu quán cafe khác vào đây...
    ]);

    return (
        <div className={cx('find-restaurant')}>
            {/* Header */}
            <HeaderUser />

            {/* Banner */}
            <div className={cx('banner')}>
                <img src={images.headerFindRestaurant} alt="Restaurant Banner" />
                <h1>カフェを探すのはやめて、見つけましょう。</h1>
                <div className={cx('search-bar-wrapper')}>
                    <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                    <input
                        type="text"
                        className={cx('search-bar')}
                        placeholder="名前、料理、場所からレストランを検索"
                    />
                </div>
            </div>
            <div className={cx('filters-container')}>
                <div className={cx('filters-left')}>
                    <h4>フィルター</h4>
                    <a href="#">
                        <FontAwesomeIcon icon={faRedo} />
                        フィルターをクリア
                    </a>
                    <h3>54秒で376件の結果が見つかりました</h3>
                </div>
                <div className={cx('filters-right')}>
                    <h3>並べ替え:</h3>
                    <Dropdown title="並べ替え" width="150px">
                        <div>評価: 低から高</div>
                        <div>評価: 高から低</div>
                    </Dropdown>
                    <h3>結果:</h3>
                    <Dropdown title="結果" width="100px">
                        <div>1 - 5</div>
                        <div>6 - 10</div>
                        <div>11 - 15</div>
                    </Dropdown>
                    <FontAwesomeIcon icon={faThLarge} className={cx('view-icon')} />
                    <FontAwesomeIcon icon={faBars} className={cx('view-icon')} />
                </div>
            </div>

            {/* Main content */}
            <div className={cx('content')}>
                {/* Filter Section */}
                <div className={cx('filter')}>
                    <div className={cx('filter-option')}>
                        <h3>価格（円）</h3>
                        <CheckboxInput id="1">安い (20)</CheckboxInput>
                        <CheckboxInput id="2">手頃な価格 (20)</CheckboxInput>
                        <CheckboxInput id="3">高い (50)</CheckboxInput>
                        <CheckboxInput id="4">高価なものはすべて (5)</CheckboxInput>
                    </div>
                    <div className={cx('filter-option')}>
                        <h3>料理/食品の種類</h3>
                        <CheckboxInput id="5">エスプレッソ (200)</CheckboxInput>
                        <CheckboxInput id="6">アメリカ人 (20)</CheckboxInput>
                        <CheckboxInput id="7">カプチーノ (50)</CheckboxInput>
                        <CheckboxInput id="8">マキアートコーヒー (5)</CheckboxInput>
                        <CheckboxInput id="9">ラテ (15)</CheckboxInput>
                        <CheckboxInput id="10">モカ (5)</CheckboxInput>
                    </div>
                    <div className={cx('filter-option')}>
                        <h3>評価</h3>
                        <CheckboxInput id="11">
                            <Rating small rate={1}></Rating>
                        </CheckboxInput>
                        <CheckboxInput id="12">
                            <Rating small rate={2}></Rating>
                        </CheckboxInput>
                        <CheckboxInput id="13">
                            <Rating small rate={3}></Rating>
                        </CheckboxInput>
                        <CheckboxInput id="14">
                            <Rating small rate={4}></Rating>
                        </CheckboxInput>
                        <CheckboxInput id="15">
                            <Rating small rate={5}></Rating>
                        </CheckboxInput>
                    </div>
                    <div className={cx('filter-option')}>
                        <h3>距離</h3>
                        <CheckboxInput id="16">0.5km 以内 </CheckboxInput>
                        <CheckboxInput id="17">0.5～1km </CheckboxInput>
                        <CheckboxInput id="18">1～1.5km</CheckboxInput>
                        <CheckboxInput id="19">1.5～2km</CheckboxInput>
                        <CheckboxInput id="20">2km 以上</CheckboxInput>
                    </div>
                </div>

                {/* List of Cafes */}
                <div className={cx('cafe-list')}>
                    {cafes.map((cafe, index) => (
                        <CafeItem
                            key={index}
                            image={cafe.image}
                            name={cafe.name}
                            location={cafe.location}
                            priceRange={cafe.priceRange}
                            rating={cafe.rating}
                            reviews={cafe.reviews}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FindRestaurant;
