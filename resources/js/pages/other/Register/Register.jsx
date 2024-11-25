import React from 'react';
import { useState, } from 'react';
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('パスワードが一致しません');
            return;
        }

        const payload = {
            name: username,
            email: email,
            password: password,
        };

        axios.post('http://127.0.0.1:8000/api/register', payload)
            .then(response => {
                if (response.status === 201) {
                    alert('登録が成功しました');
                    window.location.href = '/login';
                } else {
                    alert('登録が失敗しました');
                }
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    return (
        <>
            <div className={cx('container')}>
                <div className={cx('main')}>
                    <div className={cx('left-content')}>
                        <div className={cx('register-header')}>
                            <img className={cx('logo')} src={images.logo} alt="logo" />
                            <div className={cx('title')}>
                                <span>カフェ</span>初心者
                                <img className={cx('icon')} src={images.icon} alt="coffee-icon" />
                            </div>
                        </div>
                        <div className={cx('google-register')}>
                            <Button
                                noBackground
                                large
                                shadow
                                width="300px"
                                curved
                                leftIcon={<img style={{ width: 18 }} src={images.google} alt="ggicon"></img>}
                            >
                                Googleでログイン
                            </Button>
                        </div>
                        <div className={cx('separate')}>
                            <div className={cx('separate-text')}>または</div>
                        </div>
                        <form className={cx('register-form')}>
                            <div className={cx('register-input')}>
                                <CustomInput
                                    id='username'
                                    large
                                    required
                                    label="名前"
                                    width="100%"
                                    value={username}
                                    setValue={setUsername}
                                ></CustomInput>
                                <CustomInput
                                    id='email'
                                    large
                                    required
                                    label="メール"
                                    width="100%"
                                    value={email}
                                    setValue={setEmail}
                                ></CustomInput>
                                <PasswordInput
                                    id='password'
                                    large
                                    required
                                    label="パスワード"
                                    width="100%"
                                    password={password}
                                    setPassword={setPassword}
                                ></PasswordInput>
                                <PasswordInput
                                    id='confirmPassword'
                                    large
                                    required
                                    label="パスワードを確認してください"
                                    width="100%"
                                    value={confirmPassword}
                                    setPassword={setConfirmPassword}
                                ></PasswordInput>
                            </div>
                            <div className={cx('register-checkbox')}>
                                <CheckboxInput onChange={() => setRemember(!remember)}>30日間記憶する</CheckboxInput>
                            </div>
                            <div className={cx('submit-btn')}>
                                <Button onClick={(e) => handleSubmit(e)} secondary shadow width="100%" curved large>
                                    サインアップ
                                </Button>
                            </div>
                        </form>
                        <div className={cx('register-footer')}>
                            <span>すでにアカウントをお持ちですか？</span>
                            <a href="/login">ログイン</a>
                        </div>
                    </div>
                    <div className={cx('right-content')}>
                        <img src={images.register} alt="register"></img>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
