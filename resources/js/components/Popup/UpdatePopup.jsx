import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import ImageUploading from 'react-images-uploading';

import { DefaultInput } from '../Input';
import Button from '../Button';

import images from '~/assets/images';
import styles from './Popup.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const UpdatePopup = ({ id, onClose }) => {
    const [restaurant, setRestaurant] = useState({});
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [priceStart, setPriceStart] = useState('');
    const [priceEnd, setPriceEnd] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [images, setImages] = useState([]);
    const [openTime, setOpenTime] = useState('');
    const [closeTime, setCloseTime] = useState('');
    const maxNumber = 4;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/restaurant?id=${id}`
                );
                if (response.status === 200) {
                    setRestaurant(response.data.restaurant);
                    setName(response.data.restaurant.name);
                    setDesc(response.data.restaurant.description);
                    setAddress(response.data.restaurant.address);
                    setPhone(response.data.restaurant.phone);
                    setPriceStart(response.data.restaurant.price_start);
                    setPriceEnd(response.data.restaurant.price_end);
                    setPriceStart(response.data.restaurant.price_start);
                    setEmail(response.data.restaurant.email);
                    setAvatar(response.data.restaurant.avatar);
                    setImages(response.data.restaurant.images);
                    setOpenTime(response.data.restaurant.open_time);
                    setCloseTime(response.data.restaurant.close_time);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const onAvatarChange = (image) => {
        // console.log(image.file);
        setAvatar(image.dataURL);
        setAvatarFile(image.file);
    };

    const onChange = (imageList, addUpdateIndex) => {
        // console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post(`http://127.0.0.1:8000/api/restaurant/update/${id}`,
                { name, description: desc, address, phone, email, price_start: priceStart, price_end: priceEnd, avatar: avatarFile, images, open_time: openTime, close_time: closeTime },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then((response) => {
                console.log(response);
                onClose();
                parent.location.reload();
            });
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    return (
        <div className={cx('layout')}>
            <div className={cx('popup')}>
                <div className={cx('container')}>
                    <div className={cx('header', 'flex-row')}>
                        <h1><span>カフェ</span>情報を編集</h1>
                        <button className={cx('close-btn')} onClick={() => { onClose() }}>
                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                        </button>
                    </div>
                    <form className={cx('content', 'flex-row')} onSubmit={(e) => e.preventDefault()}>
                        <div className={cx('left')}>
                            <div className={cx('content-item', 'flex-col')}>
                                <h3 className={cx('title')} >一般情報</h3>
                                <div className={cx('flex-col')} style={{ gap: 6 }}>
                                    <DefaultInput value={name} setValue={setName} id='' label='カフェ名'></DefaultInput>
                                    <DefaultInput setValue={setDesc} value={desc} id='' label='説明'></DefaultInput>
                                </div>
                            </div>
                            <div className={cx('content-item', 'flex-col')}>
                                <h3 className={cx('title')}>連絡先</h3>
                                <DefaultInput setValue={setAddress} value={address} id='' label='住所'></DefaultInput>
                                <div className={cx('flex-row')} style={{ marginTop: 6 }}>
                                    <DefaultInput setValue={setPhone} value={phone} type='number' id='' label='電話番号'></DefaultInput>
                                    <DefaultInput setValue={setEmail} value={email} type='email' id='' label='メール' width={'60%'}></DefaultInput>
                                </div>
                            </div>
                            <div className={cx('content-item', 'flex-col')}>
                                <h3 className={cx('title')}>価格</h3>
                                <div className={cx('flex-row')}>
                                    <DefaultInput setValue={setPriceStart} value={priceStart} id='' label='最低価格 (đ)'></DefaultInput>
                                    <DefaultInput setValue={setPriceEnd} value={priceEnd} id='' label='最高価格 (đ)' width={'60%'}></DefaultInput>
                                </div>
                            </div>
                        </div>
                        <div className={cx('right')}>
                            <div className={cx('content-item')}>
                                <h3 className={cx('title')}>メディア</h3>
                                <div>
                                    <label className={cx('label')}>アバター</label>
                                    <ImageUploading
                                        value={avatar ? [avatar] : []}
                                        onChange={(imageList) => onAvatarChange(imageList[0])}
                                    >
                                        {({ onImageUpload, onImageUpdate }) => (
                                            <div className={cx('upload__avatar-wrapper')}>
                                                {avatar ? (
                                                    <img
                                                        src={avatar}
                                                        width="100"
                                                        height="100"
                                                        onClick={onImageUpdate} />
                                                ) :
                                                    (<button onClick={onImageUpload}>
                                                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                                    </button>)}
                                            </div>
                                        )}
                                    </ImageUploading>
                                </div>
                                <div>
                                    <label className={cx('label')}>フォトギャラリー</label>
                                    <ImageUploading
                                        multiple
                                        value={images}
                                        onChange={onChange}
                                        maxNumber={maxNumber}
                                        dataURLKey="data_url"
                                    >
                                        {({
                                            imageList,
                                            onImageUpload,
                                            onImageRemoveAll,
                                            onImageUpdate,
                                            onImageRemove,
                                        }) => (
                                            <div className={cx('upload__image-wrapper')}>
                                                <button onClick={onImageUpload} className={cx('add-btn')}>
                                                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                                </button>
                                                <div className={cx('image-list')}>
                                                    {imageList.map((image, index) => (
                                                        <div key={index} className={cx('image-item')}>
                                                            <img src={image['data_url']} alt="" width="100" onClick={() => onImageUpdate(index)} />
                                                            <div className={cx('image-item__btn-wrapper')}>
                                                                <button onClick={() => onImageRemove(index)}>
                                                                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </ImageUploading>
                                </div>
                            </div>
                            <div className={cx('content-item')}>
                                <h3 className={cx('title')}>営業時間</h3>
                                <div className={cx('flex-row')}>
                                    <DefaultInput setValue={setOpenTime} value={openTime} id='' label='オープン' width={'45%'}></DefaultInput>
                                    <DefaultInput setValue={setCloseTime} value={closeTime} id='' label='クローズ' width={'45%'}></DefaultInput>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className={cx('flex-row')}>
                        <div className={cx('flex-1')}></div>
                        <Button onClick={(e) => onSubmitHandler(e)} curved primary width={'100px'}>セーブ</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePopup;
