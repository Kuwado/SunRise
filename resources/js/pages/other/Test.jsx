import React, { useState } from 'react';
import Card from '~/components/Card';
import { CheckboxInput } from '~/components/Checkbox';
import Dropdown from '~/components/Dropdown';
import { CustomInput, DefaultInput, PasswordInput } from '~/components/Input';
import Rating from '~/components/Rating';
import Star from '~/components/Rating/Star';
import { AddCollectionPopup } from '../user/components/CollectionPopup';
const Test = () => {
    const [checked, setChecked] = useState(false);
    return (


        <input checked={checked} readOnly type="checkbox" onChange={true ? {} : ()=>{setChecked(!checked)}} />
    )
};

export default Test;
