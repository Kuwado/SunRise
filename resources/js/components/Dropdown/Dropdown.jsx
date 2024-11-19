import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Dropdown.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faL } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Dropdown = ({
    title = '',
    label = '',
    id = 'id',
    selected,
    width = 'fit-content',
    required,
    className,
    children,
}) => {
    const [show, setShow] = useState(false);
    const dropRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropRef.current && !dropRef.current.contains(e.target)) {
                setShow(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={cx('dropdown', { active: show, [className]: className, 'no-label': !label })} style={{ width }}>
            <div className={cx('label')}>
                {label}
                {required && <span className={cx('required-note')}>*</span>}
                {!label && 'no-label'}
            </div>
            <div className={cx('dropdown-box')} ref={dropRef} onClick={() => setShow((prev) => !prev)}>
                <div className={cx('selected')}>{selected ? selected : title}</div>
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={show ? faChevronUp : faChevronDown} />
                </div>
                {show && children && (
                    <div className={cx('options')}>
                        <div className={cx('wrapper')}>{children}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dropdown;
