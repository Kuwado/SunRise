import classNames from 'classnames/bind';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import để tùy chỉnh icon cho Marker
import styles from './Map.module.scss';

const cx = classNames.bind(styles);

// Tùy chỉnh biểu tượng marker (nếu cần)
const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41], // Kích thước icon
    iconAnchor: [12, 41], // Điểm neo icon
});

const Map = () => {
    // Tọa độ trung tâm
    // const latitude = 21.017021;
    // const longitude = 105.78348;
    const latitude = 20.9929374;
    const longitude = 105.7933964;

    return (
        <MapContainer
            center={[latitude, longitude]} // Tọa độ trung tâm
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
                center={[latitude, longitude]} // Tọa độ trung tâm
                radius={2000} // Bán kính 2km
                color="blue" // Màu viền
                fillColor="blue" // Màu nền
                fillOpacity={0.3} // Độ trong suốt
            />

            {/* Thêm Marker tại vị trí trung tâm */}
            <Marker position={[latitude, longitude]} icon={markerIcon}>
                <Popup>
                    Đây là vị trí trung tâm! <br /> Vĩ độ: {latitude}, Kinh độ: {longitude}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
