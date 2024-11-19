import classNames from 'classnames/bind';

import styles from './DefaultInput.module.scss';

const cx = classNames.bind(styles);

const DefaultInput = ({ value, setValue, label = '', placeholder = '', type = 'text', id, width, required }) => {
    return (
        <div className={cx('default-input')} style={{ width: width }}>
            <label htmlFor={`default-input-${id}`}>
                {label}
                {required && <span className={cx('required-note')}>*</span>}
            </label>
            <input
                id={`default-input-${id}`}
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
};

export default DefaultInput;
