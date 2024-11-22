import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import Button from '~/components/Button';
import { CustomInput, PasswordInput } from '~/components/Input';
import { CheckboxInput } from '~/components/Checkbox';
import images from '~/assets/images';
import axios from 'axios';
const cx = classNames.bind(styles);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            email: email,
            password: password,
            // remember: remember,
        };
        console.log(payload);

        try {
            // Call API
            const response = await axios.post('https://127.0.0.1:8000/login', payload);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('main')}>
                <div className={cx('left-content')}>
                    <div className={cx('login-header')}>
                        <img className={cx('logo')} src={images.logo} alt="logo" />
                        <div className={cx('title')}>
                            <span>カフェ</span>初心者
                            <img className={cx('icon')} src={images.icon} alt="coffee-icon" />
                        </div>
                    </div>
                    <div className={cx('google-login')}>
                        <Button
                            large
                            noBackground
                            shadow
                            width="300px"
                            curved
                            leftIcon={<img style={{ width: 18 }} src={images.google} alt="google-icon" />}
                        >
                            Googleでログイン
                        </Button>
                    </div>
                    <div className={cx('separate')}>
                        <div className={cx('separate-text')}>または</div>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)} className={cx('login-form')}>
                        <div className={cx('login-input')}>
                            <CustomInput
                                large
                                medium
                                required
                                label="メール"
                                width="300px"
                                value={email}
                                setValue={setEmail}
                            />
                        </div>
                        <div className={cx('login-input')}>
                            <PasswordInput
                                large
                                medium
                                required
                                label="パスワード"
                                width="300px"
                                password={password}
                                setPassword={setPassword}
                            />
                        </div>
                        <div className={cx('login-checkbox')}>
                            <CheckboxInput onChange={() => setRemember(!remember)}>30日間記憶する</CheckboxInput>
                        </div>
                        <div className={cx('submit-btn')}>
                            <Button large secondary shadow curved width="300px">
                                ログイン
                            </Button>
                        </div>
                    </form>
                    <div className={cx('login-footer')}>
                        <span>アカウントをお持ちですか？</span>
                        <a href="/register">サインアップ</a>
                    </div>
                </div>
                <div className={cx('right-content')}>
                    <div className={cx('login-image')}>
                        <img src={images.login} alt="login" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
