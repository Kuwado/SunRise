import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRedo, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import Rating from '~/components/Rating';
import ProductItem from '~/components/ProductItem';
import { CheckboxInput } from '~/components/Checkbox';
import { AddPopup } from '~/components/Popup';
import Button from '~/components/Button';
import HeaderAdmin from '../components/header/HeaderAdmin';
import Search from '~/components/Search';

import styles from './ProductList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ProductList = () => {
    const [isShowAddPopup, setIsShowAddPopup] = useState(false);
    const [products, setProducts] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [types, setTypes] = useState([]);
    const [styles, setStyles] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/restaurants', {
                params: { page: currentPage, style_ids: styles.toString(), ratings: ratings.toString() },
            });
            if (response.status === 200) {
                setProducts(response.data.restaurants.data);
                setTotalPages(response.data.restaurants.meta.last_page);
            }
        } catch (error) {
            alert('Error fetching products' + error.response.data.message);
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [styles, ratings, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleStyleChange = (styleId) => {
        setStyles((prevStyles) => {
            const newStyles = [...prevStyles];
            if (newStyles.includes(styleId)) {
                newStyles.splice(newStyles.indexOf(styleId), 1);
            } else {
                newStyles.push(styleId);
            }
            setCurrentPage(1);
            return newStyles;
        });
    };

    const handleRatingChange = (productRating) => {
        setRatings((prevRatings) => {
            const newRatings = [...prevRatings];
            if (newRatings.includes(productRating)) {
                newRatings.splice(newRatings.indexOf(productRating), 1);
            } else {
                newRatings.push(productRating);
            }
            setCurrentPage(1);
            return newRatings;
        });
    };

    const handleClearFilter = () => {
        setStyles([]);
        setRatings([]);
        setCurrentPage(1);
    };

    const handleReFetch = () => {
        fetchProducts();
    };

    const searchProducts = async () => {
        try {
            const response = await axios.get('/api/restaurants', {
                params: { search: search },
            });
            if (response.status === 200) {
                setProducts(response.data.restaurants.data);
                setTotalPages(response.data.restaurants.meta.last_page);
            }
        } catch (error) {
            alert('Error fetching products' + error.response.data.message);
            console.error('Error fetching products:', error);
        }
    };

    return (
        <>
            {isShowAddPopup && <AddPopup onReFetch={handleReFetch} onClose={() => setIsShowAddPopup(false)}></AddPopup>}
            <div className={cx('container')}>
                <HeaderAdmin />
                <div className={cx('head')}>
                    <h3>
                        すべての<span>カフェ</span>
                    </h3>
                    <Search
                        placeholder={`名前、料理、場所からレストランを検索`}
                        width={'500px'}
                        value={search}
                        setValue={setSearch}
                        onKeyDown={searchProducts}
                    />
                    <Button
                        onClick={() => setIsShowAddPopup(true)}
                        primary
                        curved
                        rightIcon={<FontAwesomeIcon icon={faPlus} className={cx('add-btn')}></FontAwesomeIcon>}
                    >
                        追加
                    </Button>
                </div>
                <div className={cx('main')}>
                    <div className={cx('filter')}>
                        <div className={cx('title')}>
                            フィルター
                            <span onClick={() => handleClearFilter()}>
                                <FontAwesomeIcon icon={faRedo}></FontAwesomeIcon>フィルターをクリア
                            </span>
                        </div>
                        <div className={cx('filter-option')}>
                            <h3>価格（円）</h3>
                            <CheckboxInput id="1">安い (20)</CheckboxInput>
                            <CheckboxInput id="2">手頃な価格 (20)</CheckboxInput>
                            <CheckboxInput id="3">高い (50)</CheckboxInput>
                            <CheckboxInput id="4">高価なものはすべて (5)</CheckboxInput>
                        </div>
                        <div className={cx('filter-option')}>
                            <h3>料理/食品の種類</h3>
                            <CheckboxInput id="5" checked={styles.includes(1)} onChange={() => handleStyleChange(1)}>
                                エスプレッソ (200)
                            </CheckboxInput>
                            <CheckboxInput id="6" checked={styles.includes(2)} onChange={() => handleStyleChange(2)}>
                                アメリカ人 (20)
                            </CheckboxInput>
                            <CheckboxInput id="7" checked={styles.includes(3)} onChange={() => handleStyleChange(3)}>
                                カプチーノ (50)
                            </CheckboxInput>
                            <CheckboxInput id="8" checked={styles.includes(4)} onChange={() => handleStyleChange(4)}>
                                マキアートコーヒー (5)
                            </CheckboxInput>
                            <CheckboxInput id="9" checked={styles.includes(5)} onChange={() => handleStyleChange(5)}>
                                ラテ (15)
                            </CheckboxInput>
                            <CheckboxInput id="10" checked={styles.includes(6)} onChange={() => handleStyleChange(6)}>
                                モカ (5)
                            </CheckboxInput>
                        </div>
                        <div className={cx('filter-option')}>
                            <h3>評価</h3>
                            <CheckboxInput
                                id="11"
                                checked={ratings.includes(1)}
                                onChange={() => {
                                    handleRatingChange(1);
                                }}
                            >
                                <Rating small rate={1}></Rating>
                            </CheckboxInput>
                            <CheckboxInput
                                id="12"
                                checked={ratings.includes(2)}
                                onChange={() => {
                                    handleRatingChange(2);
                                }}
                            >
                                <Rating small rate={2}></Rating>
                            </CheckboxInput>
                            <CheckboxInput
                                id="13"
                                checked={ratings.includes(3)}
                                onChange={() => {
                                    handleRatingChange(3);
                                }}
                            >
                                <Rating small rate={3}></Rating>
                            </CheckboxInput>
                            <CheckboxInput
                                id="14"
                                checked={ratings.includes(4)}
                                onChange={() => {
                                    handleRatingChange(4);
                                }}
                            >
                                <Rating small rate={4}></Rating>
                            </CheckboxInput>
                            <CheckboxInput
                                id="15"
                                checked={ratings.includes(5)}
                                onChange={() => {
                                    handleRatingChange(5);
                                }}
                            >
                                <Rating small rate={5}></Rating>
                            </CheckboxInput>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('product-list')}>
                            {products.length === 0 ? (
                                <div className={cx('no-result')}>No result</div>
                            ) : (
                                products.map((restaurant, index) => (
                                    <ProductItem key={index} restaurant={restaurant} onReFetch={handleReFetch} />
                                ))
                            )}
                        </div>
                        <div className={cx('pagination')}>
                            {products.length > 0 && (
                                <>
                                    <Button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
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
                </div>
            </div>
        </>
    );
};

export default ProductList;
