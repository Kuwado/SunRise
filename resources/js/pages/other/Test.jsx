import React, { useState } from 'react';
import { CheckboxInput } from '~/components/Checkbox';
import Dropdown from '~/components/Dropdown';
import { DefaultInput, PasswordInput } from '~/components/Input';
import Rating from '~/components/Rating';
import Star from '~/components/Rating/Star';

const Test = () => {
    const [password, setPassword] = useState('');
    const [input, setInput] = useState('');
    const [array, setArray] = useState(['haha1', 'haha2', 'haha3dâdfafdsfsdf']);
    console.log(password);

    const handleChecked = (e) => {
        if (e.target.checked) {
            alert('check');
        }
    };

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
            <CheckboxInput name="save" title="30日間記憶する" id="helo" onChange={handleChecked}>
                hloe
            </CheckboxInput>
            <Star rate={30} large />
            <Rating rate={3.56} medium />
        </div>
    );
};

export default Test;
