import classNames from 'classnames/bind';

import styles from './Password.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const PasswordInput = ({ password, setPassword, width = '500px' }) => {
    const [show, setShow] = useState(false);
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className={cx('password-input')} style={{ width: width }}>
            <input type={show ? 'text' : 'password'} value={password} onChange={handleChangePassword} />
        </div>
    );
};

export default PasswordInput;
