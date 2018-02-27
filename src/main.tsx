import * as React from 'react';
import * as ReactDOM from 'react-dom';

import CustomButton from './CustomButton';
import Counter from './Counter';


ReactDOM.render(
    <div>
        <CustomButton>{"Hello!"}</CustomButton>
        <Counter/>
    </div>,
    document.getElementById("app")
)
