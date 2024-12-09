import React, { useState } from 'react';
import Card from '~/components/Card';
import { CheckboxInput } from '~/components/Checkbox';
import Dropdown from '~/components/Dropdown';
import { CustomInput, DefaultInput, PasswordInput } from '~/components/Input';
import Rating from '~/components/Rating';
import Star from '~/components/Rating/Star';
const Test = () => {
    const [email, setEmail] = useState('');
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
        <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <PasswordInput
                id="ps"
                label="メール"
                width="500px"
                password={password}
                setPassword={setPassword}
                required
            />
            <CustomInput id="hee" label="メール" value={email} setValue={setEmail} required />
            <DefaultInput value={input} setValue={setInput} placeholder="値を入力" />
            <Dropdown title="Helo" label="haha">
                {array.map((arr, index) => (
                    <div key={`${index}`}>
                        <span>hshs</span>
                        <div>{arr}</div>
                    </div>
                ))}
            </Dropdown>
            <CheckboxInput onChange={handleChecked}>安い (20)</CheckboxInput>
            <Star rate={30} large />
            <Rating rate={3.56} medium />
            <Card />
        </div>
    );
};

export default Test;
