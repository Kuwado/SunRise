import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import background from '~/assets/background';
import Button from '~/components/Button';
import { PasswordInput } from '~/components/Input';

const Landing = () => {
    const [password, setPassword] = useState('k');
    return (
        <div>
            <Button small primary shadow width="200px" curved leftIcon={<FontAwesomeIcon icon={faUser} />}>
                Helo
            </Button>
            <PasswordInput password={password} setPassword={setPassword} />
            <img src={background.bg1} width="500px"></img>
        </div>
    );
};

export default Landing;
