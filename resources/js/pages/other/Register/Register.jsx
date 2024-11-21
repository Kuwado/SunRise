import React from 'react';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';

import Button from '~/components/Button';
import { CustomInput, PasswordInput } from '~/components/Input';
import { CheckboxInput } from '~/components/Checkbox';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const Register = () => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            username: username,
            email: email,
            password: password,
            confirm_password: confirmPassword,
            remember: remember,
        }
        console.log(payload);

        try {
            // Call API
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className={cx('container')}>
                <div className={cx('main')}>
                    <div className={cx('left-content')}>
                        <div className={cx('register-header')}>
                            <img className={cx('logo')} src={images.logo} alt="logo" />
                            <div className={cx('title')}><span>カフェ</span>初心者
                                <img className={cx('icon')} src={images.icon} alt="coffee-icon" />
                            </div>
                        </div>
                        <div className={cx('google-register')}>
                            <Button noBackground shadow width='250px' curved leftIcon={<img style={{width: 18}} src={images.google} alt='ggicon'></img>}>Googleでログイン</Button>
                        </div>
                        <div className={cx('separate')}>
                            <div className={cx('separate-text')}>または</div>
                        </div>
                        <form className={cx('register-form')}>
                            <div className={cx('register-input')}>
                                <CustomInput medium required label='名前' width='250px' value={username} setValue={setUsername}></CustomInput>
                            </div>
                            <div className={cx('register-input')}>
                                <CustomInput medium required label='メール' width='250px' value={email} setValue={setEmail}></CustomInput>
                            </div>
                            <div className={cx('register-input')}>
                                <PasswordInput medium required label='パスワード' width='250px' password={password} setPassword={setPassword}></PasswordInput>
                            </div> 
                            <div className={cx('register-input')}>
                                <PasswordInput medium required label='パスワードを確認してください' width='250px' value={confirmPassword} setPassword={setConfirmPassword}></PasswordInput>
                            </div>
                            <div className={cx('register-checkbox')}>
                                <CheckboxInput onChange={() => setRemember(!remember)}>30日間記憶する</CheckboxInput>
                            </div>
                            <div className={cx('submit-btn')}>
                                <Button onClick={(e) => handleSubmit(e)} secondary shadow width='250px' curved>サインアップ</Button>
                            </div>
                        </form>
                        <div className={cx('register-footer')}>
                            <span>すでにアカウントをお持ちですか？</span>
                            <a href='/login'>ログイン</a>
                        </div>
                    </div>
                    <div className={cx('right-content')}>
                        <div className={cx('register-image')}>
                            <img src={images.register} alt='register'></img>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Register;
