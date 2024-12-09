import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Search = ({
    value,
    setValue,
    label = '',
    placeholder = '',
    type = 'text',
    id,
    width,
    required,
    className,
    inputClassName,
    readOnly,
    onKeyDown,
}) => {
    const handleChangeValue = (e) => {
        setValue(e.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onKeyDown && onKeyDown();
        }
    };

    return (
        <div className={cx('search-input', { 'no-label': !label, [className]: className })} style={{ width: width }}>
            <label htmlFor={`search-input-${id}`}>
                {label}
                {required && <span className={cx('required-note')}>*</span>}
                {!label && 'no-label'}
            </label>
            <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
            <input
                id={`search-input-${id}`}
                type={type}
                value={value}
                onChange={handleChangeValue}
                placeholder={placeholder}
                className={cx({ [inputClassName]: inputClassName })}
                readOnly={readOnly}
                autoComplete='off'
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default Search;
