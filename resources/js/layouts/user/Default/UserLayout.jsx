import classNames from 'classnames/bind';

import styles from './UserLayout.module.scss';

const cx = classNames.bind(styles);

const UserLayout = ({ children }) => {
    return <div className={cx('user-layout')}>{children}</div>;
};

export default UserLayout;
