import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faTrashCan, faPen, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import images from '~/assets/images';
import Dropdown from '~/components/Dropdown';
import Rating from '~/components/Rating';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Favorite.module.scss';
import RadioInput from '~/components/radio';
import FavoriteItem from '../components/restaurants/FavoriteItem';
import { AddCollectionPopup } from '../components/CollectionPopup';

const cx = classNames.bind(styles);
export default function Favorite() {
    const [types, setTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [priceRange, setPriceRange] = useState({ start: null, end: null });
    const [priceType, setPriceType] = useState();
    const [products, setProducts] = useState([]);
    const [totalPriceProducts, setTotalPriceroducts] = useState([]);
    const [collection, setCollection] = useState('すべてのいい');
    const [editCollection, setEditCollection] = useState(false);
    const [collections, setCollections] = useState([]);
    const [collectionId, setCollectionId] = useState(-1);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios
                .get('/api/collection', {
                    params: {
                        id: collectionId,
                    },
                })
                .then((response) => {
                    console.log(response);
                    setProducts(response.data.data.collection.restaurants.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            axios;
        };

        if (collectionId !== -1) fetchProducts();
    }, [collectionId]);

    useEffect(() => {
        axios
            .get('/api/collections', {
                params: {
                    user_id: localStorage.getItem('userId'),
                },
            })
            .then((response) => {
                // console.log(response);
                setCollections(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log(currentPage);

    useEffect(() => {
        axios
            .get('/api/favorites', {
                params: {
                    user_id: localStorage.getItem('userId'),
                    perPage: 4,
                    page: currentPage,
                },
            })
            .then((response) => {
                // console.log(response.data.data.data);
                console.log(response.data.data);
                setProducts(response.data.data.data);
                setTotalPages(response.data.data.last_page);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [currentPage]);
    console.log(products);
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 405,
            behavior: 'smooth',
        });
    };

    const handleCollectionIdChange = (id) => {
        setCollectionId(id);
        setCollection(id === -1 ? 'すべてのいい' : collections.find((collection) => collection.id === id).name);
    };

    const handleClearFilter = () => {};

    const handleCollectionUpdate = () => {
        setEditCollection(!editCollection);
    };

    const updateCollection = () => {
        axios
            .post(`/api/collection/update/${collectionId}`, {
                name: collection,
                user_id: localStorage.getItem('userId'),
            })
            .then((response) => {
                console.log(response);
                setEditCollection(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCollectionDelete = () => {
        confirm('本当に削除しますか？');
        if (!confirm) {
            return;
        }
        axios
            .delete(`/api/collection/delete/${collectionId}`, {})
            .then((response) => {
                console.log(response);
                setCollection('すべてのいい');
                setCollectionId(-1);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const inputStyle = editCollection
        ? { border: '1px solid #000', backgroundColor: '#fff', borderRadius: '8px' }
        : { border: 'none', backgroundColor: 'transparent' };

    const handlePriceTypeChange = (typeId) => {
        if (typeId === priceType) {
            setPriceRange({ start: null, end: null });
            setPriceType(0);
        } else {
            switch (typeId) {
                case 1:
                    setPriceRange({ start: null, end: user.price_start });
                    break;
                case 2:
                    setPriceRange({ start: user.price_start, end: user.price_end });
                    break;
                case 3:
                    setPriceRange({ start: user.price_end, end: null });
                    break;
                case 4:
                    setPriceRange({ start: user.price_end, end: null });
            }
            setPriceType(typeId);
        }
        setCurrentPage(1);
    };

    return (
        <>
            <div className={cx('favoriteRestaurant')}>
                <div className={cx('banner')}>
                    <img src={images.headerFindRestaurant} alt="Restaurant Banner" />
                    <h1>あなたのお気に入りのカフェが一挙に。</h1>
                </div>
                <div className={cx('filters-container')}>
                    <div className={cx('filters-left')}>
                        <h4>フィルター</h4>
                        <a onClick={() => handleClearFilter()} href="#">
                            <FontAwesomeIcon icon={faRedo} />
                            フィルターをクリア
                        </a>
                    </div>
                    <div className={cx('name-collection')}>
                        <input
                            style={inputStyle}
                            type="text"
                            value={collection}
                            onChange={(e) => setCollection(e.target.value)}
                            contentEditable={editCollection}
                            unselectable="true"
                        />
                        <div hidden={!editCollection}>
                            <Button onClick={() => updateCollection()} curved primary width={'150px'}>
                                {' '}
                                アップデート
                            </Button>
                        </div>
                    </div>
                    <div className={cx('filters-right')}>
                        {collectionId !== -1 && (
                            <>
                                <div style={{ cursor: 'pointer' }} onClick={() => handleCollectionDelete()}>
                                    <FontAwesomeIcon icon={faTrashCan} className={cx('view-icon')} />
                                    <span>消去</span>
                                </div>
                                <div style={{ cursor: 'pointer' }} onClick={() => handleCollectionUpdate()}>
                                    <FontAwesomeIcon icon={faPen} className={cx('view-icon')} />
                                    <span>編集</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('filter')}>
                        <div className={cx('filter-option')}>
                            <h3>私のコレクション</h3>
                            <RadioInput
                                id={-1}
                                onChange={() => handleCollectionIdChange(-1)}
                                checked={-1 === collectionId}
                            >
                                すべてのいい
                            </RadioInput>
                            {collections.length > 0 &&
                                collections.map((collection, index) => {
                                    return (
                                        <RadioInput
                                            key={index}
                                            id={collection.id}
                                            onChange={() => handleCollectionIdChange(collection.id)}
                                            checked={collection.id === collectionId}
                                        >
                                            {collection.name}
                                        </RadioInput>
                                    );
                                })}
                        </div>
                        <Dropdown
                            title="並べ替え 評価: 低から高"
                            width="width=227px"
                            // setValue={setFilterDrPrice}
                            // selected={filterDrPrice}
                            // handleClick={handleSortPrice}
                        >
                            <div>並べ替え 評価: 低から高</div>
                            <div>並べ替え 評価: 高から低</div>
                        </Dropdown>
                        <div className={cx('filter-option')} style={{ marginTop: '20px' }}>
                            <h3>価格（円）</h3>
                            <RadioInput id="1" checked={priceType === 1} onChange={() => handlePriceTypeChange(1)}>
                                安い({totalPriceProducts[1]})
                            </RadioInput>
                            <RadioInput id="2" checked={priceType === 2} onChange={() => handlePriceTypeChange(2)}>
                                手頃な価格({totalPriceProducts[2]})
                            </RadioInput>
                            <RadioInput id="3" checked={priceType === 3} onChange={() => handlePriceTypeChange(3)}>
                                高い({totalPriceProducts[3]})
                            </RadioInput>
                            <RadioInput id="4" checked={priceType === 4} onChange={() => handlePriceTypeChange(4)}>
                                高価なものはすべて({totalPriceProducts[4]})
                            </RadioInput>
                        </div>
                    </div>

                    <div className={cx('favorite-list')}>
                        {products.length === 0 ? (
                            <div></div>
                        ) : (
                            products.map((restaurant, index) => (
                                <FavoriteItem
                                    key={index}
                                    id={restaurant.id}
                                    image={restaurant.image}
                                    name={restaurant.name}
                                    location={restaurant.address}
                                    price_start={restaurant.price_range.start}
                                    price_end={restaurant.price_range.end}
                                    time_ago={restaurant.time_ago}
                                    rating={restaurant.rating}
                                    reviews={restaurant.reviews}
                                />
                            ))
                        )}
                    </div>
                </div>
                <div className={cx('pagination')}>
                    {products.length > 0 && (
                        <>
                            <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </Button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    primary={currentPage === page}
                                    small
                                >
                                    {page}
                                </Button>
                            ))}
                            <Button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <FontAwesomeIcon icon={faAngleRight} />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
