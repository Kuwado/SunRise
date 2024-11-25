import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

import images from '~/assets/images';
import styles from './ProductItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Restaurant = {
    id: 5,
    avatar: images.restaurant,
    name: 'カフェA',
    address: '道路A | B地区',
    createdAt: '2024年10月26日',
    updatedAt: '2024年10月26日',
};

const ProductItem = ({ restaurant = Restaurant }) => {
    return (
        <div className={cx('card')}>
            <div className={cx('avatar')}>
                <img src={restaurant.avatar} alt="avatar" />
            </div>

            <div className={cx('content')}>
                <div className={cx('name')}>{restaurant.name}</div>
                <div className={cx('address')}>
                    <FontAwesomeIcon icon={faHouse} />
                    {restaurant.address}
                </div>
                <div className={cx('create-update-time')}>
                    <div className={cx('created')}>
                        <span>作成日: </span>
                        {restaurant.createdAt}
                    </div>
                    <div className={cx('update')}>
                        <span>更新日: </span>
                        {restaurant.updatedAt}
                    </div>
                </div>
            </div>

            <div className={cx('btn')}>
                <a href=''><FontAwesomeIcon icon={faPen} /></a>
                <a href=''><FontAwesomeIcon icon={faTrash} /></a>
            </div>
        </div>
    );
};

export default ProductItem;
