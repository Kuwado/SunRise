# Hướng dẫn cài đặt và chạy dự án SunRise

## Yêu cầu hệ thống

-   Node.js
-   XAMPP
-   Composer
-   Laravel

## Cài đặt

### 1. Cài đặt Node.js

Tải và cài đặt Node.js từ trang chủ: [Node.js](https://nodejs.org/)

### 2. Cài đặt XAMPP

Tải và cài đặt XAMPP từ trang chủ: [XAMPP](https://www.apachefriends.org/index.html)

### 3. Cài đặt Composer

Tải và cài đặt Composer từ trang chủ: [Composer](https://getcomposer.org/)

### 4. Cài đặt Laravel

Mở terminal và chạy lệnh sau để cài đặt Laravel:

```sh
composer global require laravel/installer
```

## Cách chạy project

### 1. Clone repository

Clone repository từ GitHub vào folder htdocs của xampp:

```sh
git clone <https://github.com/Kuwado/SunRise.git>
```

### 2. Cài đặt các package cần thiết

Chạy các lệnh sau trong thư mục dự án để cài đặt các package cần thiết:

```sh
composer install
npm install
```

### 3. Cấu hình môi trường

Tạo file `.env` từ file mẫu `.env.example`:

```sh
cp .env.example .env
php artisan key:generate
```

Thay đổi các thông số cần thiết trong file `.env`:

![image](https://github.com/user-attachments/assets/f8cc6b58-6d52-45d0-a87d-b3930728738f)

### 4. Chạy XAMPP

Mở XAMPP và khởi động Apache và MySQL.

### 5. Chạy migration và seed database

Chạy các lệnh sau để tạo bảng và seed dữ liệu:

```sh
php artisan migrate
php artisan db:seed
php artisan storage:link
```

### 6. Chạy server

Chạy các lệnh sau:

```sh
npm run dev
php artisan serve
```

Mở trình duyệt và truy cập `http://localhost:8000` để xem kết quả.

### Tài khoản:

// Địa điểm mặc định đang là Keangnam Sun

1. User: user@sun-asterisk.com
   Pass: 123456

2. Admin: admin@sun-asterisk.com
   Pass: 123456

### Lưu ý:

0. Để hoàn tất bản mới nhất:

-   Sync và pull code mới về
-   tạo database mới từ file database/sunrirse.sql (Xóa sunrise cũ nếu có, tạo sunrise mới, import file sunrise.sql vào)
-   giải nén storage.zip vào cho nó đè cái cũ hoặc xóa cái cũ đi cũng được (Mục đích là lấy ảnh)

1. Các restaunrant id từ 1 đến 30 là dữ liệu fake

-   Nhược điểm: Không có hình ảnh, avatar mặc định
-   Ưu điểm: Khi bật map được tổng quan do điạ điểm phân bố đều hơn
    => Nếu không muốn thì tự xóa nhen

2. Tài khoản User có tọa độ ở Sun rồi, do api chuyển địa điểm sang tọa độ nó ko tìm đc cái địa chỉ đấy, nên tôi fix cứng vào db rồi => Dẫn tới là lúc update profile nếu vẫn để nguyên cái địa chỉ sun đấy nó sẽ báo lỗi 422 do địa chỉ không hợp lệ á.
   => Nếu các bạn vẫn muốn demo chức năng liên quan trang profile thì nên để đến cuối cùng nhé, khi mà không cần dùng tới map hay tọa độ của sun nữa, thì khi đấy sửa cái địa chỉ đấy thành cái khác hợp lệ (ví dụ: Ha Noi) là cập nhật bình thường nhé

3. Các cửa hàng đã tạo có vài cái ảnh chưa được rõ nét (bạn làm kêu tải ảnh đẹp rồi mà không hiểu sao lúc tạo lên nó vậy :-D)

-   Địa chỉ thì chúng tôi đã cố đáp ứng yêu cầu 15 gần sun 15 gần BK rồi nhé
-   Nếu muốn đẹp hơn các bạn vào admin update ảnh nhé
-   Và tất cả các cửa hàng hình như chưa có video đâu, các bạn tự thêm nhé, vào vài cái mà sẽ show là oke rồi
