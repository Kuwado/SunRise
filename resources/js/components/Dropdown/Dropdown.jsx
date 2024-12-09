import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Dropdown.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Dropdown = ({
    title = '',
    label = '',
    id = 'id',
    selected,
    setValue,
    width = 'fit-content',
    left = false,
    right = false,
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

    const handleOptionClick = (option) => {
        setValue(option); // Cập nhật giá trị được chọn
        setTimeout(() => {
            setShow(false); // Đóng dropdown sau khi chọn
        }, 0);
    };

    const classes = cx('dropdown', {
        active: show,
        [className]: className,
        'no-label': !label,
        left,
        right,
    });

    return (
        <div className={classes}>
            <div className={cx('label')}>
                {label}
                {required && <span className={cx('required-note')}>*</span>}
                {!label && 'no-label'}
            </div>
            <div
                className={cx('dropdown-box')}
                style={{ width }}
                ref={dropRef}
                onClick={() => setShow((prev) => !prev)}
            >
                <div className={cx('selected')}>{selected || title}</div>
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={show ? faChevronUp : faChevronDown} />
                </div>
                {show && children && (
                    <div className={cx('options')}>
                        <div className={cx('wrapper')}>
                            {React.Children.map(children, (child) => (
                                <div onClick={() => handleOptionClick(child.props.children)} className={cx('option')}>
                                    {child.props.children}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dropdown;
