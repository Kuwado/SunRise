import React, { useState } from 'react';
import Dropdown from '~/components/Dropdown';
import { DefaultInput, PasswordInput } from '~/components/Input';

const Test = () => {
    const [password, setPassword] = useState('');
    const [input, setInput] = useState('');
    const [array, setArray] = useState(['haha1', 'haha2', 'haha3']);
    console.log(password);
    return (
        <div style={{ padding: 10, display: 'flex', flexDirection: 'column' }}>
            <PasswordInput id="ps" label="メール" password={password} setPassword={setPassword} required />
            <DefaultInput value={input} setValue={setInput} placeholder="値を入力" />
            <Dropdown title="Helo" label="haha">
                {array.map((arr, index) => (
                    <div key={`${index}`}>
                        <span>hshs</span>
                        <div>{arr}</div>
                    </div>
                ))}
            </Dropdown>
        </div>
    );
};

export default Test;
