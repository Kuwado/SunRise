import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

import images from '~/assets/images';
import styles from './ProductItem.module.scss';
import classNames from 'classnames/bind';

import { use, useState } from 'react';
import { UpdatePopup, DeletePopup } from '../Popup';

const cx = classNames.bind(styles);

const ProductItem = ({ restaurant = restaurant }) => {
    const [isShowUpdatePopup, setIsShowUpdatePopup] = useState(false);
    const [isShowDeletePopup, setIsShowDelelePopup] = useState(false);

    return (
        <>
            {isShowUpdatePopup && (<UpdatePopup id={restaurant.id} onClose={() => setIsShowUpdatePopup(false)}></UpdatePopup>)}
            {isShowDeletePopup && (<DeletePopup id={restaurant.id} onClose={() => setIsShowDelelePopup(false)}></DeletePopup>)}
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
                            {restaurant.created_at.slice(0, 10)}
                        </div>
                        <div className={cx('update')}>
                            <span>更新日: </span>
                            {restaurant.updated_at.slice(0, 10)}
                        </div>
                    </div>
                </div>
    
                <div className={cx('btn')}>
                    <div  onClick={() => setIsShowUpdatePopup(true)}><FontAwesomeIcon icon={faPen} /></div>
                    <div onClick={() => setIsShowDelelePopup(true)}><FontAwesomeIcon icon={faTrash} /></div>
                </div>
            </div>
        </>
    );
};

export default ProductItem;
