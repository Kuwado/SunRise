import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserInfor.module.scss';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DefaultInput } from '~/components/Input';
import Dropdown from '~/components/Dropdown';
import { useEffect } from 'react';
import { AuthContext } from '~/context/AuthContext';
import vietnamCities from './vietnamCities.json';
import japanCities from './japanCities.json';
import workPlaces from './workPlace.json';
const cx = classNames.bind(styles);
export default function UserInfor() {
    const { currentUser, setCurrentUser, updateUser, headPhone, setHeadPhone } = useContext(AuthContext);
    // const [headPhone, setHeadPhone] = useState('');
    const [cityOptions, setCityOptions] = useState([]);
    const [workplaceOptions, setWorkplaceOptions] = useState([]);
    const priceRangeOptions = ['0-40', '40-90', '90-150'];
    const distanceOptions = ['2 km', '3 km', '4 km'];
    const countryOptions = ['Vietnam', 'Japan'];
    const headPhoneOptions = ['+01', '+91', '+84'];
    const styleOptions = [
        { id: 1, label: 'エスプレッソ' },
        { id: 2, label: 'アメリカ人' },
        { id: 3, label: 'カプチーノ' },
        { id: 4, label: 'マキアートコーヒー' },
        { id: 5, label: 'ラテ' },
        { id: 6, label: 'フラットホワイト' },
    ];
    // console.log(user);
    useEffect(() => {
        if (currentUser.nationality === 'Vietnam') {
            setCityOptions(vietnamCities);
        } else if (currentUser.nationality === 'Japan') {
            setCityOptions(japanCities);
        } else {
            setCityOptions([]);
        }
        setWorkplaceOptions(workPlaces);
    }, [currentUser.nationality]);

    useEffect(() => {
        if (currentUser.phone) {
            const phone = currentUser.phone;
            if (phone.startsWith('+')) {
                setHeadPhone(phone.slice(0, 3));
                setCurrentUser((prev) => ({
                    ...prev,
                    phone: phone.slice(3),
                }));
            } else {
                setHeadPhone('+84');
            }
        }
    }, [currentUser.phone]);
    return (
        <>
            {currentUser && (
                <div className={cx('container')}>
                    <img className={cx('header-image')} src={images.headerUser} alt="headerUser" />
                    <div className={cx('header-title')}>
                        <div className={cx('header-avatar')}>
                            <img
                                className={cx('avatar')}
                                src={
                                    currentUser.avatar instanceof File
                                        ? URL.createObjectURL(currentUser.avatar)
                                        : currentUser.avatar ?? images.avatarUser
                                }
                                alt="avatarUser"
                            />
                            <label htmlFor="avatar-input" className={cx('camera-icon')}>
                                <FontAwesomeIcon icon={faCamera} />
                                <input
                                    name="avatar-input"
                                    id="avatar-input"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setCurrentUser((prev) => ({ ...prev, avatar: file }));
                                        }
                                    }}
                                    type="file"
                                    hidden
                                />
                            </label>
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
                                    value={currentUser.name}
                                    setValue={(value) => setCurrentUser({ ...currentUser, name: value })}
                                    placeholder="名前"
                                    label="名前"
                                    inputClassName={cx('input')}
                                />
                                <DefaultInput
                                    value={currentUser.birth}
                                    setValue={(value) => setCurrentUser({ ...currentUser, birth: value })}
                                    placeholder="生年月日"
                                    label="生年月日"
                                    inputClassName={cx('input')}
                                />
                                <DefaultInput
                                    value={currentUser.address}
                                    setValue={(value) => setCurrentUser({ ...currentUser, address: value })}
                                    placeholder="住所"
                                    label="住所"
                                    inputClassName={cx('input')}
                                />
                                <Dropdown
                                    className={cx('dropdownInfor')}
                                    title="市"
                                    selected={currentUser.city}
                                    setValue={(value) => setCurrentUser({ ...currentUser, city: value })}
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
                                    selected={`${currentUser.desired_distance} km`}
                                    setValue={(value) => {
                                        const distance = value.replace(' km', ''); // Loại bỏ " km" để lấy giá trị số
                                        setCurrentUser({ ...currentUser, desired_distance: parseInt(distance) });
                                    }}
                                    width="100%"
                                    label="希望の距離"
                                >
                                    {distanceOptions.map((option, index) => (
                                        <div key={index}>{option}</div>
                                    ))}
                                </Dropdown>
                                <Dropdown
                                    title="値を入力"
                                    selected={`${currentUser.price_start}-${currentUser.price_end}`}
                                    // setValue={setPriceRange}
                                    setValue={(value) => {
                                        const [start, end] = value.split('-'); // Phân tách chuỗi thành giá trị start và end
                                        setCurrentUser({
                                            ...currentUser,
                                            price_start: parseInt(start),
                                            price_end: parseInt(end),
                                        }); // Cập nhật state
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
                                    value={currentUser.email}
                                    setValue={(value) => setCurrentUser({ ...currentUser, email: value })}
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
                                        value={currentUser.phone || ''} // Đảm bảo luôn có giá trị chuỗi
                                        setValue={(value) =>
                                            setCurrentUser({
                                                ...currentUser,
                                                phone: value, // Chỉ cập nhật phần số điện thoại
                                            })
                                        }
                                        placeholder="9120000000"
                                        width="100%"
                                        inputClassName={cx('input')}
                                    />
                                </div>
                                <Dropdown
                                    title="職場"
                                    selected={currentUser.workplace}
                                    setValue={(value) => setCurrentUser({ ...currentUser, workplace: value })}
                                    width="100%"
                                    label="職場"
                                >
                                    {workplaceOptions.map((option, index) => (
                                        <div key={index}>{option}</div>
                                    ))}
                                </Dropdown>
                                <Dropdown
                                    title="国"
                                    selected={currentUser.nationality}
                                    setValue={(value) => setCurrentUser({ ...currentUser, nationality: value })}
                                    width="100%"
                                    label="国"
                                >
                                    {countryOptions.map((option, index) => (
                                        <div key={index}>{option}</div>
                                    ))}
                                </Dropdown>
                                <Dropdown
                                    title="エスプレッソ"
                                    selected={
                                        styleOptions.find((option) => option.id === currentUser.style_id)?.label ||
                                        'エスプレッソ'
                                    }
                                    setValue={(value) => {
                                        const selectedOption = styleOptions.find((option) => option.label === value);
                                        if (selectedOption) {
                                            setCurrentUser({ ...currentUser, style_id: selectedOption.id });
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
                            <Button large secondary shadow width="140px" onClick={() => updateUser(currentUser)}>
                                保存
                            </Button>
                            <Button large secondary shadow width="140px">
                                キャンセル
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
