import classNames from 'classnames/bind';

import styles from './Rating.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Star = ({ rate, small, medium, large }) => {
    const classes = cx('star', {
        small,
        medium,
        large,
    });

    return (
        <div className={classes}>
            <FontAwesomeIcon className={cx('extra-star')} icon={faStar} />
            <div className={cx('main')} style={{ width: `${rate}%` }}>
                <FontAwesomeIcon className={cx('main-star')} icon={faStar} />
            </div>
        </div>
    );
};

export default Star;
