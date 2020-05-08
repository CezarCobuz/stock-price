import './input.css'

import { action, observable } from "mobx";

import React from "react";
import { observer } from "mobx-react";

export class InputState {
    @observable
    value: string = "";

    @action
    onChange(newValue: string) {
        this.value = newValue;
    }
}

export const Input: React.FC<{ state: InputState }> = observer(({ state }) => {
    return (
        <input
            className='Input'
            value={state.value}
            onChange={(e) => state.onChange(e.target.value)}
        />
    );
});
