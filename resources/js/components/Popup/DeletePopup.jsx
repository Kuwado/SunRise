import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { DefaultInput } from '../Input';
import Button from '../Button';
import Dropdown from '../Dropdown';

import styles from './Popup.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const DeletePopup = ({ id, onClose, onReFetch }) => {
    const [restaurant, setRestaurant] = useState({});
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [priceStart, setPriceStart] = useState('');
    const [priceEnd, setPriceEnd] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [files, setFiles] = useState([]);
    const [medias, setMedias] = useState('');
    const [images, setImages] = useState([]);
    const [openTime, setOpenTime] = useState('');
    const [closeTime, setCloseTime] = useState('');    
    const [styles, setStyles] = useState('');
    const styleOptions = [
        { id: 1, label: '開放的な空間' }, // Quán cà phê hiện đại
        { id: 2, label: '現代的な空間' }, // Quán cà phê cổ điển
        { id: 3, label: 'レトロな空間' }, // Nơi hòa mình vào thiên nhiên
        { id: 4, label: '落ち着いた空間' }, // Không gian yên tĩnh
        { id: 5, label: '高級な空間' }, // Quán cà phê với âm nhạc
        { id: 6, label: '共有スペース' }, // Quán cà phê có phòng triển lãm nghệ thuật
    ];

    const fetchRestaurantStyles = async (id) => {
        console.log('fetchRestaurantStyles', id);
        try {
            const response = await axios.get(
                `/api/restaurant/styles?restaurant_id=${id}`
            );
            if (response.status === 200) {
                console.log('fetchRestaurantStyles', response);
                setStyles(response.data.data[0].style_id);
            }
        } catch (error) {
            console.error("Error fetching restaurant styles:", error);
        }
    };

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await axios.get(
                    `/api/restaurant?id=${id}`
                );
                if (response.status === 200) {
                    setRestaurant(response.data.restaurant);
                    setName(response.data.restaurant.name);
                    setDesc(response.data.restaurant.description);
                    setAddress(response.data.restaurant.address);
                    setPhone(response.data.restaurant.phone);
                    setPriceStart(response.data.restaurant.price_start);
                    setPriceEnd(response.data.restaurant.price_end);
                    setMail(response.data.restaurant.email);
                    setAvatar(response.data.restaurant.avatar);
                    setFiles(response.data.restaurant.media ? response.data.restaurant.media : []);
                    setOpenTime(response.data.restaurant.open_time);
                    setCloseTime(response.data.restaurant.close_time);
                    fetchRestaurantStyles(response.data.restaurant.id);
                }
            } catch (error) {
                console.error("Error fetching restaurant:", error);
            }
        };

        fetchRestaurant();
    }, []);

    useEffect(() => {
        const newImages = [];
        let newMedias = '';
        files.forEach((file) => {
            if (file && !file.includes(".mp4")) newImages.push(file);
            else newMedias = file;
        });
        setImages(newImages);
        setMedias(newMedias);
    }, [files]);

    const onSubmitHandler = async () => {
        try {
            const response = await axios.delete(
                `/api/restaurant/delete/${id}`
            );
            if (response.status === 200) {
                // console.log(response);
                alert(response.data.message);
                onClose();
                onReFetch();
            }
        } catch (error) {
            console.error("Error deleting restaurant:", error);
            alert('Error deleting restaurant' + error?.response?.data?.message);
        }
    };



    return (
        <div className={cx('layout')}>
            <div className={cx('popup')}>
                <div className={cx('container')}>
                    <div className={cx('header', 'flex-row')}>
                        <h1><span>カフェ</span>の削除を確認</h1>
                        <button className={cx('close-btn')} onClick={() => { onClose() }}>
                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                        </button>
                    </div>
                    <form className={cx('content', 'flex-row')}>
                        <div className={cx('left')}>
                            <div className={cx('content-item', 'flex-col')}>
                                <h3 className={cx('title')}>一般情報</h3>
                                <div className={cx('flex-col')} style={{ gap: 6 }}>
                                    <DefaultInput readOnly value={name} id='' label='カフェ名'></DefaultInput>
                                    <DefaultInput readOnly value={desc} id='' label='説明'></DefaultInput>
                                    <Dropdown id='' label='スペース'
                                        selected={
                                            styleOptions.find((option) => option.id === styles)?.label ||
                                            'なし'
                                        }
                                        width="100%">
                                        {styleOptions.map((option, index) => (
                                            <div key={index}>{option.label}</div>
                                        ))}
                                    </Dropdown>
                                </div>
                            </div>
                            <div className={cx('content-item', 'flex-col')}>
                                <h3 className={cx('title')}>連絡先</h3>
                                <DefaultInput readOnly value={address} id='' label='住所'></DefaultInput>
                                <div className={cx('flex-row')} style={{ marginTop: 6 }}>
                                    <DefaultInput readOnly value={phone} type='tel' id='' label='電話番号'></DefaultInput>
                                    <DefaultInput readOnly value={mail} type='mail' id='' label='メール' width={'60%'}></DefaultInput>
                                </div>
                            </div>
                            <div className={cx('content-item', 'flex-col')}>
                                <h3 className={cx('title')}>価格</h3>
                                <div className={cx('flex-row')}>
                                    <DefaultInput readOnly value={priceStart} id='' label='最低価格 (đ)'></DefaultInput>
                                    <DefaultInput readOnly value={priceEnd} id='' label='最高価格 (đ)' width={'60%'}></DefaultInput>
                                </div>
                            </div>
                        </div>
                        <div className={cx('right')}>
                            <div className={cx('content-item')}>
                                <h3 className={cx('title')}>メディア</h3>
                                <div className={cx('flex-row')}>
                                    <div>
                                        <label className={cx('label')}>アバター</label>
                                        <div className={cx('upload__avatar-wrapper')}>
                                            <img
                                                src={avatar}
                                                width="120"
                                                height="120"
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('VideoInput')}>
                                        <label className={cx('label')}>ビデオ</label>
                                        <div className={cx('VideoInput_container')}>
                                            {medias && (
                                                <video
                                                    className={cx('VideoInput_video')}
                                                    width={200}
                                                    height={118}
                                                    controls
                                                    src={medias}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <label className={cx('label')}>フォトギャラリー</label>
                                <div className={cx('upload__image-wrapper')}>
                                    <div className={cx('image-list')}>
                                        {images.length > 0 && images.map((image, index) => (
                                            <div key={index} className={cx('image-item')}>
                                                <img src={image} alt="" width="150" height='90' />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('content-item')}>
                                <h3 className={cx('title')}>営業時間</h3>
                                <div className={cx('flex-row')}>
                                    <DefaultInput readOnly value={openTime} id='' label='オープン' width={'45%'}></DefaultInput>
                                    <DefaultInput readOnly value={closeTime} id='' label='クローズ' width={'45%'}></DefaultInput>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className={cx('flex-row')}>
                        <div className={cx('flex-1')}></div>
                        <Button onClick={() => { onClose() }} curved secondary width={'120px'}>キャンセル</Button>
                        <Button onClick={(e) => onSubmitHandler()} curved primary width={'100px'}>デリート</Button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DeletePopup;
