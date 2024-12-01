import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderUser.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Dropdown from '~/components/Dropdown';
const cx = classNames.bind(styles);
export default function HeaderUser() {
    return (
        <div className={cx('header')}>
            <img className={cx('logo')} src={images.logo} alt="logo" />
            <div className={cx('tab-menu')}>
                <div className={cx('tab-home')}>ホーム</div>
                <div className={cx('tab-restaurant')}>レストラン</div>
            </div>
            <div className={cx('user-hugs')}>
                <img className={cx('avatar-header')} src={images.avatarUser} alt="logo" />
                <Dropdown />
            </div>
        </div>
    );
}
