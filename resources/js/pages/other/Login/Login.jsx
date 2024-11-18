import classNames from 'classnames/bind';

import styles from './Login.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Login = () => {
    return (
        <div className={cx('login-page')}>
            <Button primary shadow leftIcon={<FontAwesomeIcon icon={faUser} />}>
                Hellollo
            </Button>
        </div>
    );
};

export default Login;
