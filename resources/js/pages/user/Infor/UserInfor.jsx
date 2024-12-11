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
import { useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import japanCities from './japanCities.json';
const cx = classNames.bind(styles);
export default function UserInfor() {
    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState('モビナ・ミルバゲリ');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [headPhone, setHeadPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [distance, setDistance] = useState('');
    const priceRangeOptions = ['0-40', '40-90', '90-150'];
    const [priceRange, setPriceRange] = useState(priceRangeOptions);
    const [workplace, setWorkplace] = useState('Keangnam');
    const [country, setCountry] = useState('Vietnam', 'Japan');
    const [cityOptions, setCityOptions] = useState([]);

    const [user, setUser] = useState({
        name: '',
        email: '',
        birth: '',
        phone: ``,
        address: '',
        city: '',
        desired_distance: '',
        price_start: '',
        price_end: '',
        workplace: '',
        nationality: '',
        style_id: '',
    });

    // const cityOptions = ['Tokyo', 'Osaka', 'Kyoto'];
    const distanceOptions = ['2', '3', '4'];
    const workplaceOptions = ['Keangnam', 'Landmark', 'Bitexco'];
    const countryOptions = ['Vietnam', 'Japan'];
    // const styleOptions = ['エスプレッソ', 'アメリカ人', 'カプチーノ', 'マキアートコーヒー', 'ラテ', 'フラットホワイト'];
    const headPhoneOptions = ['+01', '+91', '+84'];
    const styleOptions = [
        { id: 1, label: 'エスプレッソ' },
        { id: 2, label: 'アメリカ人' },
        { id: 3, label: 'カプチーノ' },
        { id: 4, label: 'マキアートコーヒー' },
        { id: 5, label: 'ラテ' },
        { id: 6, label: 'フラットホワイト' },
    ];

    console.log(user);

    const onAvatarChange = (image) => {
        // console.log(image);
        setAvatar(image);
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`/api/user`, {
                    params: { id: 2 }, // Thay ID bằng ID user
                });
                setUser(response.data.user);
                // setAvatarPreview(response.data.user.avatar);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        setCityOptions(japanCities);
        fetchUserInfo();
    }, []);

    const handleUpdateUser = async () => {
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('birth', user.birth);
        formData.append('phone', user.phone);
        formData.append('address', user.address);
        formData.append('city', user.city);
        formData.append('desired_distance', user.desired_distance);
        formData.append('price_start', user.price_start);
        formData.append('price_end', user.price_end);
        formData.append('workplace', user.workplace);
        formData.append('nationality', user.nationality);
        formData.append('style_id', user.style_id);
        // if (avatar) formData.append('avatar', avatar);

        try {
            const response = await axios.post(`/api/user/update/2`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };
    console.log(user);

    return (
        <>
            <div className={cx('container')}>
                <img className={cx('header-image')} src={images.headerUser} alt="headerUser" />
                <div className={cx('header-title')}>
                    <div className={cx('header-avatar')}>
                        {/* <ImageUploading
                            value={avatar ? [avatar] : []}
                            onChange={(imageList) => onAvatarChange(imageList[0])}
                        >
                            {({ onImageUpload, onImageUpdate }) => (
                                <div className={cx('upload__avatar-wrapper')}>
                                    {avatar ? (
                                        <img src={avatar.dataURL} width="100" height="100" onClick={onImageUpdate} />
                                    ) : (
                                        <button onClick={onImageUpload}>
                                            <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
                                        </button>
                                    )}
                                </div>
                            )}
                        </ImageUploading> */}

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
                                value={user.name}
                                setValue={(value) => setUser({ ...user, name: value })}
                                placeholder="名前"
                                label="名前"
                                inputClassName={cx('input')}
                            />
                            <DefaultInput
                                value={user.birth}
                                setValue={(value) => setUser({ ...user, birth: value })}
                                placeholder="生年月日"
                                label="生年月日"
                                inputClassName={cx('input')}
                            />
                            <DefaultInput
                                value={user.address}
                                setValue={setAddress}
                                placeholder="住所"
                                label="住所"
                                inputClassName={cx('input')}
                            />
                            <Dropdown
                                className={cx('dropdownInfor')}
                                title="市"
                                selected={user.city}
                                setValue={(value) => setUser({ ...user, city: value })}
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
                                selected={user.desired_distance}
                                setValue={(value) => setUser({ ...user, desired_distance: value })}
                                width="100%"
                                label="希望の距離"
                            >
                                {distanceOptions.map((option, index) => (
                                    <div key={index}>{option}</div>
                                ))}
                            </Dropdown>
                            <Dropdown
                                title="値を入力"
                                selected={`${user.price_start}-${user.price_end}`}
                                // setValue={setPriceRange}
                                setValue={(value) => {
                                    const [start, end] = value.split('-'); // Phân tách chuỗi thành giá trị start và end
                                    setUser({ ...user, price_start: parseInt(start), price_end: parseInt(end) }); // Cập nhật state
                                }}
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
                                value={user.email}
                                setValue={(value) => setUser({ ...user, email: value })}
                                placeholder="メール"
                                label="メール"
                                inputClassName={cx('input')}
                            />
                            <div className={cx('phone-input')}>
                                <Dropdown title="+84" selected={headPhone} setValue={setHeadPhone} label="電話番号">
                                    {headPhoneOptions.map((code, index) => (
                                        <div key={index}>{code}</div>
                                    ))}
                                </Dropdown>
                                <DefaultInput
                                    value={user.phone}
                                    setValue={(value) => setUser({ ...user, phone: value })}
                                    // setValue={setPhone}
                                    placeholder="9120000000"
                                    width="100%"
                                    inputClassName={cx('input')}
                                />
                            </div>
                            <Dropdown
                                title="職場"
                                selected={user.workplace}
                                setValue={(value) => setUser({ ...user, workplace: value })}
                                width="100%"
                                label="職場"
                            >
                                {workplaceOptions.map((option, index) => (
                                    <div key={index}>{option}</div>
                                ))}
                            </Dropdown>
                            <Dropdown
                                title="国"
                                selected={user.nationality}
                                setValue={(value) => setUser({ ...user, nationality: value })}
                                width="100%"
                                label="国"
                            >
                                {countryOptions.map((option, index) => (
                                    <div key={index}>{option}</div>
                                ))}
                            </Dropdown>
                            <Dropdown
                                title="好きな味"
                                selected={
                                    styleOptions.find((option) => option.id === user.style_id)?.label ||
                                    '選択してください'
                                }
                                setValue={(value) => {
                                    const selectedOption = styleOptions.find((option) => option.label === value);
                                    if (selectedOption) {
                                        setUser({ ...user, style_id: selectedOption.id });
                                    }
                                }}
                                width="100%"
                                label="好きな味"
                            >
                                {styleOptions.map((option, index) => (
                                    <div key={index}>{option.label}</div>
                                ))}
                            </Dropdown>
                        </div>
                    </div>
                    <div className={cx('button-submit')}>
                        <Button large secondary shadow width="140px" onClick={handleUpdateUser}>
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
