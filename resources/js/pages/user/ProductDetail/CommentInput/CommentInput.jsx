import classNames from 'classnames/bind';

import styles from './CommentInput.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faSmile } from '@fortawesome/free-solid-svg-icons';
import Rating from '~/components/Rating';
import { useState } from 'react';

const cx = classNames.bind(styles);

const CommentInput = ({ restaurantId }) => {
    const [rate, setRate] = useState(0);

    return (
        <div className={cx('comment-input')}>
            <input type="text" name="comment" id="comment" placeholder="Lovely!" />
            <div className={cx('rating')}>
                <Rating />
            </div>
            <div className={cx('smile')}>
                <FontAwesomeIcon icon={faSmile} />
            </div>
            <div className={cx('camera')}>
                <FontAwesomeIcon icon={faCamera} />
            </div>
        </div>
    );
};

export default CommentInput;
