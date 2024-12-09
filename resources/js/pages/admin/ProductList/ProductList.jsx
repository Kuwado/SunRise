import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRedo } from '@fortawesome/free-solid-svg-icons';
import Rating from '~/components/Rating';
import ProductItem from '~/components/ProductItem';
import { DefaultInput } from '~/components/Input';
import { CheckboxInput } from '~/components/Checkbox';
import Button from '~/components/Button';
import styles from './ProductList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ProductList = () => {
    return (
        <div className={cx('container')}>
            <div className={cx('head')}>
                <h3>
                    すべての<span>カフェ</span>
                </h3>
                <DefaultInput placeholder={`名前、料理、場所からレストランを検索`} width={'400px'} />
                <Button
                    href={''}
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
                        <span>
                            <a href="">
                                <FontAwesomeIcon icon={faRedo}></FontAwesomeIcon>フィルターをクリア
                            </a>
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
                        <CheckboxInput id="5">エスプレッソ (200)</CheckboxInput>
                        <CheckboxInput id="6">アメリカ人 (20)</CheckboxInput>
                        <CheckboxInput id="7">カプチーノ (50)</CheckboxInput>
                        <CheckboxInput id="8">マキアートコーヒー (5)</CheckboxInput>
                        <CheckboxInput id="9">ラテ (15)</CheckboxInput>
                        <CheckboxInput id="10">モカ (5)</CheckboxInput>
                    </div>
                    <div className={cx('filter-option')}>
                        <h3>評価</h3>
                        <CheckboxInput id="11">
                            <Rating small rate={1}></Rating>
                        </CheckboxInput>
                        <CheckboxInput id="12">
                            <Rating small rate={2}></Rating>
                        </CheckboxInput>
                        <CheckboxInput id="13">
                            <Rating small rate={3}></Rating>
                        </CheckboxInput>
                        <CheckboxInput id="14">
                            <Rating small rate={4}></Rating>
                        </CheckboxInput>
                        <CheckboxInput id="15">
                            <Rating small rate={5}></Rating>
                        </CheckboxInput>
                    </div>
                </div>
                <div className={cx('product-list')}>
                    {[...Array(14).keys()].map((_, index) => (
                        <ProductItem key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
