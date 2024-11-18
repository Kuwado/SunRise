import classNames from 'classnames/bind';

import styles from './AdminLayout.module.scss';

const cx = classNames.bind(styles);

const AdminLayout = ({ children }) => {
    return (
        <div className={cx('admin-layout')}>
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
        </div>
    );
};

export default AdminLayout;
