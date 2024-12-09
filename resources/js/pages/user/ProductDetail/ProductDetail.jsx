import React from 'react';
import styles from './ProductDetail.module.scss';
import Comment from './Comment'; // Không cần ngoặc nhọn
import SlideShow from './Slideshow'; 

const ProductDetail = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>SunRise</div>
        <nav className={styles.nav}>
          <a href="/">ホーム</a>
          <a href="/cafe">カフェ</a>
          <a href="/map">地図</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Image Slider */}
        <div className={styles.imageSlider}>
          <img src="https://via.placeholder.com/1000x400" alt="Cafe Interior" />
        </div>

        {/* Cafe Details */}
        <section className={styles.details}>
          <h2 className={styles.cafeName}>Villagio カフェ</h2>
          <p className={styles.address}>
            360 San Lorenzo Avenue, Suite 1430 Coral Gables, FL 33146-1865
          </p>
          <p className={styles.hours}>10:30 AM - 11:00 PM</p>
          <p className={styles.price}>200円~500円</p>
          <p className={styles.rating}>⭐ ⭐ ⭐ ⭐ ⭐</p>
          <p className={styles.description}>
            ヴィブラジルレストラン＆バーの使命は、お客様に上質で革新的なシーフード体験を提供することです。自国詳細…
          </p>
        </section>

        {/* Comments Section */}
        <section className={styles.comments}>
          <h3>レビュー</h3>
          <div className={styles.comment}>
            <p className={styles.username}>Paul Molive</p>
            <p className={styles.userComment}>
              会社自由は非常に重要であり、開発者もそれに続きます。
            </p>
            <div className={styles.rating}>⭐ ⭐ ⭐ ⭐ ⭐</div>
          </div>
          <div className={styles.comment}>
            <p className={styles.username}>Robert Fox</p>
            <p className={styles.userComment}>
              会社自由は非常に重要であり、開発者もそれに続きます。
            </p>
            <div className={styles.rating}>⭐ ⭐ ⭐ ⭐ ⭐</div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>Copyright 2022 - 2022</p>
        <p>Privacy Policy | Website Terms</p>
      </footer>
    </div>
  );
};

export default ProductDetail;
