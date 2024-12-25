import classNames from 'classnames/bind';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import để tùy chỉnh icon cho Marker
import styles from './Map.module.scss';
import MapItem from './MapItem';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '~/context/AuthContext';

const cx = classNames.bind(styles);

const Map = () => {
    const [restaurants, setRestaurants] = useState([]);
    const { user, userId } = useContext(AuthContext);
    console.log(user.latitude);
    // Tọa độ trung tâm
    const latitude = 21.017021;
    const longitude = 105.78348;
    // const latitude = 20.9929374;
    // const longitude = 105.7933964;

    useEffect(() => {
        const fetchRes = async () => {
            try {
                const response = await axios.get(`/api/restaurants?per_page=30&page=1&user_id=${userId}`);
                if (response.status === 200) {
                    setRestaurants(response.data.restaurants.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchRes();
    }, []);

    return (
        <div className={cx('map')}>
            {user.latitude && user.longitude && (
                <MapContainer
                    center={[user.latitude, user.longitude]} // Tọa độ trung tâm
                    zoom={15} // Mức zoom phù hợp để hiển thị bán kính 2km
                    style={{ height: '100vh', width: '100%' }} // Kích thước bản đồ
                >
                    {/* Thêm lớp gạch từ OpenStreetMap */}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {/* Vẽ hình tròn bán kính 2km */}
                    <Circle
                        center={[user.latitude, user.longitude]} // Tọa độ trung tâm
                        radius={1000} // Bán kính 2km
                        // color="blue" // Màu viền
                        // fillColor="blue" // Màu nền
                        // fillOpacity={0.3} // Độ trong suốt
                    />

                    <MapItem latitude={user.latitude} longitude={user.longitude} location />

                    {restaurants.length > 0 &&
                        restaurants.map((restaurant, index) => (
                            <MapItem
                                key={index}
                                latitude={restaurant.latitude}
                                longitude={restaurant.longitude}
                                restaurant={restaurant}
                            />
                        ))}
                </MapContainer>
            )}
        </div>
    );
};

export default Map;
