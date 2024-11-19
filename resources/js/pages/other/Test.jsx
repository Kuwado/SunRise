import React, { useState } from 'react';
import { DefaultInput, PasswordInput } from '~/components/Input';

const Test = () => {
    const [password, setPassword] = useState('');
    const [input, setInput] = useState('');
    console.log(password);
    return (
        <div style={{ padding: 10, display: 'flex', flexDirection: 'column' }}>
            <PasswordInput id="ps" label="メール" password={password} setPassword={setPassword} required />
            <DefaultInput value={input} setValue={setInput} label="生年月日" placeholder="値を入力" required />
        </div>
    );
};

export default Test;
