import { useState } from 'react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import ImageUploading from 'react-images-uploading';
import axios from 'axios';

import { DefaultInput } from '../Input';
import Button from '../Button';
import Dropdown from '../Dropdown';

import styles from './Popup.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const AddPopup = ({ onClose, onReFetch }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [priceStart, setPriceStart] = useState('');
    const [priceEnd, setPriceEnd] = useState('');
    const [avatar, setAvatar] = useState();
    const [images, setImages] = useState([]);
    const [imagesFile, setImagesFile] = useState([]);
    const [media, setMedia] = useState([]);
    const [openTime, setOpenTime] = useState('');
    const [closeTime, setCloseTime] = useState('');
    const maxNumber = 4;
    const [styles, setStyles] = useState('');
    const styleOptions = [
        { id: 1, label: '開放的な空間' }, // Quán cà phê hiện đại
        { id: 2, label: '現代的な空間' }, // Quán cà phê cổ điển
        { id: 3, label: 'レトロな空間' }, // Nơi hòa mình vào thiên nhiên
        { id: 4, label: '落ち着いた空間' }, // Không gian yên tĩnh
        { id: 5, label: '高級な空間' }, // Quán cà phê với âm nhạc
        { id: 6, label: '共有スペース' }, // Quán cà phê có phòng triển lãm nghệ thuật
    ];

    const inputRef = React.useRef();

    const [source, setSource] = React.useState();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setMedia([file]);
        setSource(url);
    };

    const handleChoose = (event) => {
        inputRef.current.click();
    };

    const onAvatarChange = (image) => {
        // console.log(image);
        setAvatar(image);
    };

    const onChange = (imageList, addUpdateIndex) => {
        // console.log(imageList, addUpdateIndex);
        setImages(imageList);
        setImagesFile(imageList.map((image) => image.file));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        imagesFile.unshift(...media);
        // console.log({ name, description: desc, address, phone, email, price_start: priceStart, price_end: priceEnd, avatar : avatar?.file, media: imagesFile.length > 0 ? imagesFile : media, open_time: `${openTime}:00`, close_time: `${closeTime}:00` });
        try {
            const data = await axios.post('/api/restaurant/create-v',
                { name, description: desc, address, phone, email, price_start: priceStart, price_end: priceEnd, avatar: avatar?.file, media: imagesFile.length > 0 ? imagesFile : media, open_time: `${openTime}:00`, close_time: `${closeTime}:00` },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then((response) => {
                // console.log(response);
                addStyleToRestaurant(response.data.restaurant.id)
            });
        } catch (error) {
            console.error("Error adding restaurant:", error);
            alert('Error adding restaurant' + error?.response?.data?.message);
        }
    }

    const addStyleToRestaurant = async (id) => {
        await axios.post('/api/restaurant/style/create',
            {
                restaurant_id: id,
                style_id: styles
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then((response) => {
            alert('レストランの追加に成功しました');
            onClose();
            onReFetch();
        }).catch((error) => {
            alert('Error adding style to restaurant ' + error?.response?.data?.message)
        })
    }

    return (
        <div className={cx('layout')}>
            <div className={cx('popup')}>
                <div className={cx('container')}>
                    <div className={cx('header', 'flex-row')}>
                        <h1><span>カフェ</span>を追加</h1>
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
                                    <Dropdown id='' label='スペース'
                                        title="エスプレッソ"
                                        selected={
                                            styleOptions.find((option) => option.id === styles)?.label ||
                                            'なし'
                                        }
                                        setValue={(value) => {
                                            const selectedOption = styleOptions.find((option) => option.label === value);
                                            if (selectedOption) {
                                                setStyles(selectedOption.id);
                                            }
                                        }}
                                        width="100%">
                                        {styleOptions.map((option, index) => (
                                            <div key={index}>{option.label}</div>
                                        ))}
                                    </Dropdown>
                                </div>
                            </div>
                            <div className={cx('content-item', 'flex-col')}>
                                <h3 className={cx('title')}>連絡先</h3>
                                <DefaultInput setValue={setAddress} value={address} id='' label='住所'></DefaultInput>
                                <div className={cx('flex-row')} style={{ marginTop: 6 }}>
                                    <DefaultInput setValue={setPhone} value={phone} type='tel' id='' label='電話番号'></DefaultInput>
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
                                <div className={cx('flex-row')}>
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
                                                            src={avatar.dataURL}
                                                            width="120"
                                                            height="120"
                                                            onClick={onImageUpdate} />
                                                    ) :
                                                        (<button onClick={onImageUpload}>
                                                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                                        </button>)}
                                                </div>
                                            )}
                                        </ImageUploading>
                                    </div>
                                    <div className={cx('VideoInput')}>
                                        <label className={cx('label')}>ビデオ</label>
                                        <div className={cx('VideoInput_container')}>
                                            <input
                                                ref={inputRef}
                                                className={cx('VideoInput_input')}
                                                type="file"
                                                onChange={handleFileChange}
                                                accept=".mp4"
                                            />
                                            {!source && <button onClick={handleChoose}>
                                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                            </button>}
                                            {source && (
                                                <>
                                                    <video
                                                        className={cx('VideoInput_video')}
                                                        width={200}
                                                        height={118}
                                                        controls
                                                        src={source}
                                                    />
                                                    <button onClick={() => setSource()} className={cx('VideoInput_btn')}>
                                                        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
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
                                                            <img src={image['data_url']} alt="" width="150" height='90' onClick={() => onImageUpdate(index)} />
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
                                    <DefaultInput setValue={setOpenTime} type='time' value={openTime} id='' label='オープン' width={'45%'}></DefaultInput>
                                    <DefaultInput setValue={setCloseTime} type='time' value={closeTime} id='' label='クローズ' width={'45%'}></DefaultInput>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className={cx('flex-row')}>
                        <div className={cx('flex-1')}></div>
                        <Button onClick={(e) => onSubmitHandler(e)} small curved primary width={'100px'}>セーブ</Button></div>
                </div>
            </div>
        </div>
    );
};

export default AddPopup;
