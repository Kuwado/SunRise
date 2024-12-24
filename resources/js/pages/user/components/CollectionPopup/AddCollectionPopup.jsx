import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { DefaultInput } from '~/components/Input';
import { CheckboxInput } from '~/components/Checkbox';
import Button from '~/components/Button';

import styles from './Popup.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const AddCollectionPopup = ({ onClose }) => {
    const [collections, setCollections] = useState([]);
    const [collectionsType, setCollectionsType] = useState([]);
    const [newCollection, setNewCollection] = useState('');

    useEffect(() => {
        axios
            .get('/api/collections', {
                params: {
                    user_id: localStorage.getItem('userId'),
                },
            })
            .then((response) => {
                console.log(response);
                setCollections(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleCollectionsTypeChange = () => {
        setCollectionsType((prevCollectionsType) => {
            const newCollectionsType = [...prevCollectionsType];
            if (newCollectionsType.includes(id)) {
                newCollectionsType.splice(newCollectionsType.indexOf(id), 1);
            } else {
                newCollectionsType.push(id);
            }
            return newCollectionsType;
        });
    };
    const user_id = localStorage.getItem('userId');

    const handleAddNewCollection = () => {
        axios
            .post('/api/collection/create', {
                user_id,
                name: newCollection,
            })
            .then((response) => {
                console.log(response);
                alert('新しいコレクションが追加されました');
                setNewCollection('');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios
            .post('/api/collection/addfavorite', {
                collection_id: 6,
                favorite_id: 11,
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log('submit');
    };

    return (
        <div className={cx('layout')}>
            <div className={cx('popup')}>
                <div className={cx('container')}>
                    <div className={cx('header', 'flex-row')}>
                        <h1>
                            <span>コレクション</span>に追加
                        </h1>
                        <button
                            className={cx('close-btn')}
                            onClick={() => {
                                onClose();
                            }}
                        >
                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                        </button>
                    </div>
                    <div className={cx('content', 'flex-col')}>
                        {collections.length > 0 &&
                            collections.map((collection, index) => {
                                return (
                                    <CheckboxInput
                                        key={index}
                                        id={index + 10}
                                        onChange={() => handleCollectionsTypeChange(collection.id)}
                                    >
                                        {collection.name}
                                    </CheckboxInput>
                                );
                            })}
                        <DefaultInput
                            placeholder={'新しいコレクション名'}
                            width={'250px'}
                            noLabel
                            value={newCollection}
                            setValue={setNewCollection}
                        />
                        <Button
                            curved
                            secondary
                            width={'220px'}
                            leftIcon={<FontAwesomeIcon icon={faPlus} size="xl"></FontAwesomeIcon>}
                            onClick={handleAddNewCollection}
                        >
                            新しいコレクション
                        </Button>
                    </div>
                    <div className={cx('flex-row')}>
                        <div className={cx('flex-1')}></div>
                        <Button onClick={(e) => onSubmitHandler(e)} curved primary width={'100px'}>
                            セーブ
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCollectionPopup;
