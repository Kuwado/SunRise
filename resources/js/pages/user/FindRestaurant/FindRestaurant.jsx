import React, { useState, useEffect } from 'react';
import CafeItem from '../components/restaurants/CafeItem';
import styles from './FindRestaurant.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { DefaultInput } from '~/components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRedo, faThLarge, faBars, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '~/components/Dropdown';
import { CheckboxInput } from '~/components/Checkbox';
import Rating from '~/components/Rating';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

const FindRestaurant = () => {
    const [isGridView, setIsGridView] = useState(true);

    const [isShowAddPopup, setIsShowAddPopup] = useState(false);
    const [products, setProducts] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [types, setTypes] = useState([]);
    const [styles, setStyles] = useState([1, 2, 3]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortPrice, setSortPrice] = useState('asc');

    //state filter

    const [filterDrPrice, setFilterDrPrice] = useState('評価: 低から高', '高から低');
    const [filterDrRating, setFilterDrRating] = useState('1 - 5', '5 - 1');
    console.log(filterDrPrice);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api/restaurants`, {
                    params: {
                        styleIds: styles.toString(),
                        sort_price: filterDrPrice === '評価: 低から高' ? 'asc' : 'desc',
                        sort_rating: filterDrRating === '1 - 5' ? 'asc' : 'desc',
                        page: currentPage,
                        per_page: 9,
                    },
                });
                if (response.status === 200) {
                    setProducts(response.data.restaurants.data);
                    setTotalPages(response.data.restaurants.meta.last_page);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [types, ratings, currentPage, filterDrPrice, filterDrRating]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleTypeChange = (productType) => {
        setTypes((prevTypes) => {
            const newTypes = [...prevTypes];
            if (newTypes.includes(productType)) {
                newTypes.splice(newTypes.indexOf(productType), 1);
            } else {
                newTypes.push(productType);
            }
            setCurrentPage(1);
            return newTypes;
        });
    };

    const handleStyleChange = (styleId) => {
        setTypes((prevStyles) => {
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
    console.log(products);

    return (
        <div className={cx('find-restaurant')}>
            {/* Banner */}
            <div className={cx('banner')}>
                <img src={images.headerFindRestaurant} alt="Restaurant Banner" />
                <h1>カフェを探すのはやめて、見つけましょう。</h1>
                <div className={cx('search-bar-wrapper')}>
                    <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                    <input
                        type="text"
                        className={cx('search-bar')}
                        placeholder="名前、料理、場所からレストランを検索"
                    />
                    {/* <button className={cx('btn-search')}>
                        <FontAwesomeIcon icon={faSearch} className={cx('search-icon-2')} />
                    </button> */}
                </div>
            </div>
            <div className={cx('filters-container')}>
                <div className={cx('filters-left')}>
                    <h4>フィルター</h4>
                    <a href="#">
                        <FontAwesomeIcon icon={faRedo} />
                        フィルターをクリア
                    </a>
                    <h3>54秒で376件の結果が見つかりました</h3>
                </div>
                <div className={cx('filters-right')}>
                    <h3>並べ替え:</h3>
                    <Dropdown title="並べ替え" width="151px" setValue={setFilterDrPrice} selected={filterDrPrice}>
                        <div>評価: 低から高</div>
                        <div>評価: 高から低</div>
                    </Dropdown>
                    <h3>結果:</h3>
                    <Dropdown title="結果" width="100px" setValue={setFilterDrRating} selected={filterDrRating}>
                        <div>1 - 5</div>
                        <div>5 - 1</div>
                    </Dropdown>
                    <FontAwesomeIcon
                        icon={faThLarge}
                        className={cx('view-icon', { active: isGridView })}
                        onClick={() => setIsGridView(true)}
                    />
                    <FontAwesomeIcon
                        icon={faBars}
                        className={cx('view-icon', { active: !isGridView })}
                        onClick={() => setIsGridView(false)}
                    />
                </div>
            </div>

            {/* Main content */}
            <div className={cx('content')}>
                {/* Filter Section */}
                <div className={cx('filter')}>
                    <div className={cx('filter-option')}>
                        <h3>価格（円）</h3>
                        <CheckboxInput id="1" checked={types.includes(1)} onChange={() => handleTypeChange(1)}>
                            安い (20)
                        </CheckboxInput>
                        <CheckboxInput id="2" checked={types.includes(2)} onChange={() => handleTypeChange(2)}>
                            手頃な価格 (20)
                        </CheckboxInput>
                        <CheckboxInput id="3" checked={types.includes(3)} onChange={() => handleTypeChange(3)}>
                            高い (50)
                        </CheckboxInput>
                        <CheckboxInput id="4" checked={types.includes(4)} onChange={() => handleTypeChange(4)}>
                            高価なものはすべて (5)
                        </CheckboxInput>
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
                    <div className={cx('filter-option')}>
                        <h3>距離</h3>
                        <CheckboxInput id="16">0.5km 以内 </CheckboxInput>
                        <CheckboxInput id="17">0.5～1km </CheckboxInput>
                        <CheckboxInput id="18">1～1.5km</CheckboxInput>
                        <CheckboxInput id="19">1.5～2km</CheckboxInput>
                        <CheckboxInput id="20">2km 以上</CheckboxInput>
                    </div>
                </div>

                {/* List of Cafes */}
                <div className={cx('cafe-list', { 'grid-view': isGridView, 'list-view': !isGridView })}>
                    {products.map((cafe, index) => (
                        <CafeItem
                            key={index}
                            image={cafe.image}
                            name={cafe.name}
                            location={cafe.address}
                            priceRange={cafe.price_start}
                            rating={cafe.rating}
                            reviews={cafe.reviews}
                            isListView={!isGridView}
                        />
                    ))}
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
                        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default FindRestaurant;
