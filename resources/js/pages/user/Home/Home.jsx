import React from 'react';
import Card from '~/components/Card';
import images from '~/assets/images';
import background from '~/assets/background';
import Button from '~/components/Button';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

const Home = () => {
    return (
        <div className={styles.homePage}>
            {/* Search Bar Section */}
            <section 
                className={styles.searchSection}
                style={{ background: `url(${background.bg2}) no-repeat`, backgroundSize: 'cover' }}
            >

                <input 
                    type="text" 
                    className={styles.searchBar} 
                    placeholder="名前、料理、場所からレストランを検索" 
                />
                
            </section>

            {/* New Cafe Style Section */}
            <section className={styles.newStyleSection}>
            <img src={images.coffeeBlast} alt="Coffee Blast" className={styles.coffeeBlast} />
                <h2 className={styles.sectionHeading}>新しいカフェスタイルを楽しむ</h2>
                <p className={styles.sectionDescription}>
                    一緒にあらゆるスタイルのカフェを探検しましょう。体験する価値のある新しいカフェが常にあります。
                </p>
                <div className={styles.coffeeList}>
                    {[1, 2, 3, 4].map((_, index) => (
                        <Card key={index} />
                    ))}
                </div>
                <img src={images.coffeeBlast} alt="Coffee Blast" className={styles.coffeeBlastDown} />
            </section>

            {/* Favorites Cafe Section */}
            <section className={styles.favoritesSection}>
                <h2 className={styles.sectionHeading}>お気に入るカフェ</h2>
                <p className={styles.sectionDescription}>
                    あなたのお気に入りのカフェが一挙に
                </p>
                <div className={styles.coffeeList}>
                    {[1, 2, 3, 4].map((_, index) => (
                        <Card key={index} />
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div style={{ height: '420px' }}>
                    <img src={images.footerTop} alt="Footer Top" className={styles.footerTop} />
                </div>
                <img src={images.cfImage2} alt="Footer Top" className={styles.cfImage2} />
                <img src={images.cfImage2} alt="Footer Top" className={styles.cfImage2Right} />
                <div
                    className={styles.footerContent}
                    style={{ background: `var(--bg-secondary) url(${images.footerDown})`, backgroundSize: `contain` }}
                >
                    <nav className={styles.footerNav}>
                        <div className={styles.footerDesc}>
                            <h1 className={styles.footerLogoText}>SunRise</h1>
                            <p>一日の始まりは、お気に入りのカフェで一杯のコーヒーから。</p>
                            <p>これまでにない豊かなフレーバーを楽しんで、特別なひとときを過ごしませんか？</p>
                            <p>Sun*の社員にぴったりのカフェを見つけて、最高の体験を提供します</p>
                        </div>
                        <div className={styles.info}> 
                            <ul>
                                <li>
                                    <strong>サービス</strong>
                                </li>
                                <li>探す</li>
                                <li>マップ</li>
                            </ul>
                            <ul>
                                <li>
                                    <strong>企業情報</strong>
                                </li>
                                <li>会社概要</li>
                                <li>企業方針</li>
                                <li>理念体系</li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </footer>
        </div>
    );
};

export default Home;