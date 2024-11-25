import classNames from 'classnames/bind';

import styles from './Card.module.scss';
import Rating from '../Rating';
import Button from '../Button';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const Restaurant = {
    id: 5,
    avatar: images.logo,
    name: 'スターバックスコーヒー',
    price_start: '50k',
    price_end: '150k',
    distance: '2km',
    number: 1500,
    rate: 3.6,
};

const Card = ({ restaurant = Restaurant }) => {
    return (
        <div className={cx('card')}>
            <div className={cx('avatar')}>
                <img src={restaurant.avatar} alt="avatar" />
            </div>

            <div className={cx('content')}>
                <div className={cx('name')}>{restaurant.name}</div>
                <div className={cx('price-and-distance')}>
                    <div className={cx('price')}>
                        {restaurant.price_start} ~ {restaurant.price_end}
                    </div>
                    <div className={cx('distance')}>~ {restaurant.distance}</div>
                </div>
                <div className={cx('rating-box')}>
                    <Rating rate={restaurant.rate} small />
                    <div className={cx('number')}>
                        (<span>{restaurant.number}</span>レビュー)
                    </div>
                </div>
            </div>

            <Button className={cx('view-btn')} secondary curved shadow>
                もっと見る
            </Button>
        </div>
    );
};

export default Card;
