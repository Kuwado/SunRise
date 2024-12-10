import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserInfor.module.scss';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { CustomInput, PasswordInput } from '~/components/Input';
import { CheckboxInput } from '~/components/Checkbox';
import images from '~/assets/images';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DefaultInput } from '~/components/Input';
import Dropdown from '~/components/Dropdown';
const cx = classNames.bind(styles);
export default function UserInfor() {
    const [name, setName] = useState('モビナ・ミルバゲリ');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [distance, setDistance] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [workplace, setWorkplace] = useState('Keangnam');
    const [country, setCountry] = useState('Vietnam');
    const [taste, setTaste] = useState('');

    const cityOptions = ['Tokyo', 'Osaka', 'Kyoto'];
    const distanceOptions = ['5km', '10km', '20km'];
    const priceRangeOptions = ['Low', 'Medium', 'High'];
    const workplaceOptions = ['Keangnam', 'Landmark', 'Bitexco'];
    const countryOptions = ['Vietnam', 'Japan'];
    const tasteOptions = ['Sweet', 'Salty', 'Spicy'];
    return (
        <>
            <div className={cx('container')}>
                <img className={cx('header-image')} src={images.headerUser} alt="headerUser" />
                <div className={cx('header-title')}>
                    <div className={cx('header-avatar')}>
                        <img src={images.avatarUser} alt="avatarUser" />
                        <div className={cx('camera-icon')}>
                            <FontAwesomeIcon icon={faCamera} />
                        </div>
                    </div>
                    <div className={cx('title')}>
                        <p className={cx('title1')}>モビナ・ミルバゲリ</p>
                        <p className={cx('title2')}>アカウントの準備が整いました。アドバイスを申請できます。</p>
                    </div>
                    <img className={cx('icon1')} src={images.iconUserInfor1} alt="" />
                </div>
                <div className={cx('container-input')}>
                    <div className={cx('header-profile-tile')}>
                        <h2>プロフィールを編集</h2>
                        <h3>最終更新日 8月1日</h3>
                    </div>
                    <div className={cx('list-input')}>
                        <div className={cx('input-column')}>
                            <DefaultInput
                                value={name}
                                setValue={setName}
                                placeholder="名前"
                                label="名前"
                                inputClassName={cx('input')}
                            />
                            <DefaultInput
                                value={birthDate}
                                setValue={setBirthDate}
                                placeholder="生年月日"
                                label="生年月日"
                                inputClassName={cx('input')}
                            />
                            <DefaultInput
                                value={address}
                                setValue={setAddress}
                                placeholder="住所"
                                label="住所"
                                inputClassName={cx('input')}
                            />
                            <Dropdown
                                className={cx('dropdownInfor')}
                                title="市"
                                selected={city}
                                setValue={setCity}
                                width="100%"
                                label="市"
                            >
                                {cityOptions.map((option, index) => (
                                    <div className={cx('selection-dropdown')} key={index}>
                                        {option}
                                    </div>
                                ))}
                            </Dropdown>
                            <Dropdown
                                title="希望の距離"
                                selected={distance}
                                setValue={setDistance}
                                width="100%"
                                label="希望の距離"
                            >
                                {distanceOptions.map((option, index) => (
                                    <div key={index}>{option}</div>
                                ))}
                            </Dropdown>
                            <Dropdown
                                title="値を入力"
                                selected={priceRange}
                                setValue={setPriceRange}
                                width="100%"
                                label="好きな価格帯"
                            >
                                {priceRangeOptions.map((option, index) => (
                                    <div key={index}>{option}</div>
                                ))}
                            </Dropdown>
                        </div>
                        <div className={cx('input-column')}>
                            <DefaultInput
                                value={email}
                                setValue={setEmail}
                                placeholder="メール"
                                label="メール"
                                inputClassName={cx('input')}
                            />
                            <div className={cx('phone-input')}>
                                <Dropdown
                                    title="+98"
                                    selected={phone}
                                    setValue={setPhone}
                                    label="電話番号"
                                    height="98%"
                                >
                                    {['+01', '+91', '+84'].map((code, index) => (
                                        <div key={index}>{code}</div>
                                    ))}
                                </Dropdown>
                                <DefaultInput
                                    value={phone}
                                    setValue={setPhone}
                                    placeholder="9120000000"
                                    width="100%"
                                    inputClassName={cx('input')}
                                />
                            </div>
                            <Dropdown
                                title="職場"
                                selected={workplace}
                                setValue={setWorkplace}
                                width="100%"
                                label="職場"
                            >
                                {workplaceOptions.map((option, index) => (
                                    <div key={index}>{option}</div>
                                ))}
                            </Dropdown>
                            <Dropdown title="国" selected={country} setValue={setCountry} width="100%" label="国">
                                {countryOptions.map((option, index) => (
                                    <div key={index}>{option}</div>
                                ))}
                            </Dropdown>
                            <Dropdown
                                title="好きな味"
                                selected={taste}
                                setValue={setTaste}
                                width="100%"
                                label="好きな味"
                            >
                                {tasteOptions.map((option, index) => (
                                    <div key={index}>{option}</div>
                                ))}
                            </Dropdown>
                        </div>
                    </div>
                    <div className={cx('button-submit')}>
                        <Button large secondary shadow width="140px">
                            保存
                        </Button>
                        <Button large secondary shadow width="140px">
                            キャンセル
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
