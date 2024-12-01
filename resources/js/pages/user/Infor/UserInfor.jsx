import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserInfor.module.scss';

import Button from '~/components/Button';
import { CustomInput, PasswordInput } from '~/components/Input';
import { CheckboxInput } from '~/components/Checkbox';
import images from '~/assets/images';
import axios from 'axios';
import HeaderUser from '../components/header/HeaderUser';
const cx = classNames.bind(styles);
export default function UserInfor() {
    return <HeaderUser />;
}
