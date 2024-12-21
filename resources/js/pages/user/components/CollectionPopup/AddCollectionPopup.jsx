import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { DefaultInput } from '~/components/Input';
import { CheckboxInput } from '~/components/Checkbox';
import Button from '~/components/Button';

import styles from './Popup.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const AddCollectionPopup = ({ onClose }) => {

    const collections = [
        { id: 1, name: 'コレクションA' },
        { id: 2, name: 'コレクションB' },
        { id: 3, name: 'コレクションC' }
    ];
    const [collectionsType, setCollectionsType] = useState([]);
    const [newCollectionType, setNewCollectionType] = useState('');

    const handleCollectionsTypeChange = (id) => {
        setCollectionsType((prevCollectionsType) => {
            const newCollectionsType = [...prevCollectionsType];
            if (newCollectionsType.includes(id)) {
                newCollectionsType.splice(newCollectionsType.indexOf(id), 1);
            } else {
                newCollectionsType.push(id);
            }
            return newCollectionsType;
        });
    }

    const handleAddNewCollection = () => {
        axios.post('/api/collections', {
            name: newCollectionType
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log('submit');
    }

    return (
        <div className={cx('layout')}>
            <div className={cx('popup')}>
                <div className={cx('container')}>
                    <div className={cx('header', 'flex-row')}>
                        <h1><span>コレクション</span>に追加</h1>
                        <button className={cx('close-btn')} onClick={() => { onClose() }}>
                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                        </button>
                    </div>
                    <div className={cx('content', 'flex-col')}>
                        {
                            collections.map((collection, index) => {
                                return (
                                    <CheckboxInput key={index} id={collection.id} checked={collectionsType.includes(collection.id)} onChange={() => handleCollectionsTypeChange(collection.id)}>
                                        {collection.name}
                                    </CheckboxInput>
                                );
                            })
                        }
                        <DefaultInput placeholder={'新しいコレクション名'} width={'250px'} noLabel value={newCollectionType} setValue={setNewCollectionType}/>
                        <Button onClick curved secondary width={'220px'} leftIcon={<FontAwesomeIcon icon={faPlus} size='xl' onClick={handleAddNewCollection}></FontAwesomeIcon>}>新しいコレクション</Button>
                    </div>
                    <div className={cx('flex-row')}>
                        <div className={cx('flex-1')}></div>
                        <Button onClick={(e) => onSubmitHandler(e)} curved primary width={'100px'}>セーブ</Button></div>
                </div>
            </div>
        </div>
    );
};

export default AddCollectionPopup;
