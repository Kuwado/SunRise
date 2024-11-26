import React from 'react';

import Card from '~/components/Card';

import images from '~/assets/images';
import background from '~/assets/background';
import Button from '~/components/Button';

import styles from './Landing.module.scss';
const Landing = () => {
    return (
        <div className={styles.landingPage}>
            {/* Hero Section */}
            <section
                className={styles.heroSection}
                style={{ background: `url(${background.bg1}) no-repeat`, backgroundSize: 'cover' }}
            >
                {/* Header */}
                <header className={styles.header}>
                    <img src={images.logo} alt="SunRise Logo" className={styles.logo} />
                    <nav className={styles.nav}>
                        <a href="/login">ログイン</a>
                        <Button curved secondary width="140px">
                            新規登録
                        </Button>
                    </nav>
                </header>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>カフェ</h1>
                    <p className={styles.heroDescription}>
                        一日の始まりは、お気に入りのカフェで一杯のコーヒーから。
                        これまでにない豊かなフレーバーを楽しんで、特別なひとときを過ごしませんか？
                    </p>
                    <p className={styles.heroAdditional}>
                        Sun*の社員にぴったりのカフェを見つけて、最高の体験を提供します。
                    </p>
                    <Button curved secondary width="170px" large>
                        すぐ探す
                    </Button>
                </div>
            </section>

            {/* Best Coffee Section */}
            <section className={styles.bestCoffeeSection}>
                <div className={styles.leftSection}>
                    <h2 className={styles.sectionHeading}>最高のカフェを見つけよう</h2>
                    <p className={styles.sectionDescription}>
                        こちらのカフェ検索サイトでは、距離、価格帯、そして美しい景観などの条件でお気に入りのカフェを簡単に見つけることができます。地元や旅行先で、リラックスできる最高の場所を探し、新しいカフェ体験を楽しみましょう。
                    </p>
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.illustration}>
                        <img
                            src={images.cfImage}
                            alt="Coffee and Map Illustration"
                            className={styles.illustrationImage}
                        />
                    </div>
                </div>
            </section>

            {/* New Coffee Style Section */}
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
                            <img src={images.logo} alt="SunRise Logo" className={styles.footerLogo} />
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

export default Landing;
