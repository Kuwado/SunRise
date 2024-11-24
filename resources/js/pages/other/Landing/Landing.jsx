import React from 'react';

import Button from '~/components/Button';
import Card from '~/components/Card';

import background1 from '~/assets/background/background1.png';
import logo from '~/assets/images/logo.png';
import coffeeList from '~/assets/images/coffee-list.png';
import footerTop from '~/assets/images/footer_top.png';
import footerDown from '~/assets/images/footer_down.png';
import pngwing1 from '~/assets/images/pngwing1.png';
import pngwing2 from '~/assets/images/pngwing2.png';
import coffeeBlast1 from '~/assets/images/coffee_blast_1.png';
import coffeeBlast2 from '~/assets/images/coffe_blast_2.png';

import styles from './Landing.module.scss';
const Landing = () => {
    return (
        <div className={styles.landingPage}>
            {/* Header */}
            <header className={styles.header}>
                <img src={logo} alt="SunRise Logo" className={styles.logo} />
                <nav className={styles.nav}>
                    <button className={styles.loginButton}>ログイン</button>
                    <button className={styles.registerButton}>新規登録</button>
                </nav>
            </header>

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <h1 className={styles.heroTitle}>カフェ</h1>
                <p className={styles.heroDescription}>
                    一日の始まりは、お気に入りのカフェで一杯のコーヒーから。
                    これまでにない豊かなフレーバーを楽しんで、特別なひとときを過ごしませんか？
                </p>
                <p className={styles.heroAdditional}>
                    Sunの社員にぴったりのカフェを見つけて、最高の体験を提供します。
                </p>
                <button className={styles.exploreButton}>すぐ探す</button>
            </section>

            {/* Best Coffee Section */}
            <section className={styles.bestCoffeeSection}>
                <h2 className={styles.sectionHeading}>最高のカフェを見つけよう</h2>
                <p className={styles.sectionDescription}>
                    距離、価格帯、美しい眺めなど、条件に合うカフェを検索できます。
                </p>
                <div className={styles.sectionContent}>
                    <div className={styles.illustration}>
                        <img src={coffeeList} alt="Coffee and Map Illustration" className={styles.illustrationImage} />
                    </div>
                </div>
            </section>

            {/* New Coffee Style Section */}
            <section className={styles.newStyleSection}>
                <h2 className={styles.sectionHeading}>新しいカフェスタイルを楽しむ</h2>
                <div className={styles.coffeeList}>
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className={styles.coffeeCard}>
                            <img src={coffeeList} alt="Cafe" className={styles.cafeImage} />
                            <h3 className={styles.cafeName}>スターバックスコーヒー</h3>
                            <p className={styles.cafeDetails}>50k ~ 100k ・ ~1km</p>
                            <button className={styles.moreButton}>もっとみる</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <img src={footerTop} alt="Footer Top" className={styles.footerTop} />
                <div className={styles.footerContent}>
                    <img src={logo} alt="SunRise Logo" className={styles.footerLogo} />
                    <nav className={styles.footerNav}>
                        <ul>
                            <li><strong>サービス</strong></li>
                            <li>探す</li>
                            <li>マップ</li>
                        </ul>
                        <ul>
                            <li><strong>企業情報</strong></li>
                            <li>会社概要</li>
                            <li>企業方針</li>
                            <li>理念体系</li>
                        </ul>
                    </nav>
                </div>
                <img src={footerDown} alt="Footer Down" className={styles.footerDown} />
            </footer>
        </div>
    );
};

export default Landing;
