import classNames from 'classnames/bind';

import styles from './Password.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const PasswordInput = ({ password, setPassword, width = '500px', id = 'id', label = '', required = false }) => {
    const [show, setShow] = useState(false);
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className={cx('password-input')} style={{ width: width }}>
            <input
                id={`password-input-${id}`}
                type={show ? 'text' : 'password'}
                value={password}
                onChange={handleChangePassword}
                placeholder=" "
            />
            <label htmlFor={`password-input-${id}`}>
                {label}
                {required && <span className={cx('required-note')}>*</span>}
            </label>
            <button type="button" className={cx('show-btn')} onClick={() => setShow((prev) => !prev)}>
                <FontAwesomeIcon icon={!show ? faEye : faEyeSlash} />
            </button>
        </div>
    );
};

export default PasswordInput;
