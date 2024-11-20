import classNames from 'classnames/bind';

import styles from './Checkbox.module.scss';

const cx = classNames.bind(styles);

const CheckboxInput = ({ name, title, id = 'checkbox', checked, onChange }) => {
    return (
        <div className={cx('checkbox-input', { checked: checked })}>
            <label htmlFor={id}>
                <input type="checkbox" name={name} id={id} checked={checked} onChange={onChange} />
                <span className={cx('square')}></span>
                <span className={cx('title')}>{title}</span>
            </label>
        </div>
    );
};

export default CheckboxInput;
