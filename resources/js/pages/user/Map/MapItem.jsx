import classNames from 'classnames/bind';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import để tùy chỉnh icon cho Marker
import styles from './Map.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeart, faLocationArrow, faLocationDot, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import Rating from '~/components/Rating';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '~/context/AuthContext';
import axios from 'axios';

const cx = classNames.bind(styles);

const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41], // Kích thước icon
    iconAnchor: [12, 25], // Điểm neo icon
});

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const res = {
    id: 3,
    name: 'Schinner, Turner and Kautzer',
    email: 'irogahn@example.net',
    phone: '1-769-972-5693',
    address: '999 Balistreri Plaza\nTrompfort, RI 04980',
    latitude: '21.1833240',
    longitude: '105.9251220',
    avatar: null,
    media: null,
    description: 'Consequatur distinctio iusto qui inventore aspernatur consequuntur eum.',
    price_start: 45,
    price_end: 177,
    price_avg: 111,
    open_time: '18:37:42',
    close_time: '17:11:10',
    created_at: '2024-12-09T12:52:08.000000Z',
    updated_at: '2024-12-09T12:52:08.000000Z',
    styles: ['アメリカ人', 'カプチーノ', 'マキアートコーヒー'],
    rating: 3,
    distance: 0,
    number: 6,
    isFavorited: true,
};

// Tạo icon ngẫu nhiên màu sắc
const createRandomColorIcon = () => {
    const randomColor = getRandomColor();

    return new L.DivIcon({
        html: `<div style="color: ${randomColor}; 
                            font-size: 25px;                            
                            display: flex; 
                            justify-content: center; 
                            align-items: center;">
                  <i class="fa-solid fa-store"></i>
               </div>`,
        className: 'custom-icon', // Để style thêm nếu cần
        iconSize: [25, 25], // Kích thước icon
        iconAnchor: [12, 25], // Điểm neo của icon
    });
};

const MapItem = ({ latitude, longitude, restaurant, location = false }) => {
    const { userId } = useContext(AuthContext);
    const [favorite, setFavorite] = useState(false);
    const navigate = useNavigate();
    console.log(restaurant);

    useEffect(() => {
        if (restaurant) {
            setFavorite(restaurant.isFavorited ?? false);
        }
    }, [restaurant]);

    const handleFavortie = async () => {
        try {
            console.log(restaurant.id);
            const respose = await axios.post('api/favorite/create', { user_id: userId, restaurant_id: restaurant.id });
            if (respose.status === 200) {
                alert(`お気に入りに${restaurant.name}を追加しました。`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setFavorite(true);
        }
    };

    const handleUnFavorite = async () => {
        try {
            await axios.delete('api/favorite/delete', {
                data: { user_id: userId, restaurant_id: restaurant.id }, // Gửi dữ liệu trong body
            });
        } catch (error) {
            console.log(error);
        } finally {
            setFavorite(false);
        }
    };

    const handleClickFavorite = () => {
        if (favorite) {
            handleUnFavorite();
        } else {
            handleFavortie();
        }
    };

    const handleSeeDetail = () => {
        navigate(`/restaurant/${restaurant.id}`);
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };

    return (
        <>
            {latitude && longitude && (
                <Marker position={[latitude, longitude]} icon={location ? markerIcon : createRandomColorIcon()}>
                    {restaurant && (
                        <Popup>
                            <div className={cx('pop-up')}>
                                <div className={cx('name')} onClick={handleSeeDetail}>
                                    {restaurant.name}
                                </div>

                                <div className={cx('address')}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faLocationDot} />
                                    </span>
                                    <span>{restaurant.address}</span>
                                </div>

                                <div className={cx('time')}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faClock} />
                                    </span>
                                    <span>
                                        <span>{formatTime(restaurant.open_time)}</span> AM -
                                        <span>{formatTime(restaurant.close_time)}</span> PM
                                    </span>
                                </div>

                                <div className={cx('price')}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faMoneyBill} />
                                    </span>
                                    <span>
                                        {restaurant.price_start}円~{restaurant.price_end}円
                                    </span>
                                </div>

                                {restaurant.rating > 0 && (
                                    <div className={cx('action')}>
                                        <Rating id={restaurant.id} rate={restaurant.rating} />
                                        <div
                                            className={cx('favorite-btn')}
                                            style={{ color: favorite ? 'red' : 'gray' }}
                                            onClick={handleClickFavorite}
                                        >
                                            <FontAwesomeIcon icon={faHeart} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Popup>
                    )}
                </Marker>
            )}
        </>
    );
};

export default MapItem;
