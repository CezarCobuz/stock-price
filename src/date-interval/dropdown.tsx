import './dropdown.css';

import { action, observable } from 'mobx'

import React from 'react'
import { observer } from 'mobx-react'

export class DropdownState {
    @observable
    value: string = '';

    @observable
    valueIndex: number = 0

    @action
    onChange = (value: string, valueIndex: number) => {
        this.value = value
        this.valueIndex = valueIndex
    }
}

export const Dropdown: React.FC<{ state: DropdownState, dates: string[] }> = observer(({ state, dates }) => {
    return (
        <div>
            <select className='Dropdown' id="date"
                onChange={e => state.onChange(e.target.value, e.target.selectedIndex)}
                value={state.value}>
                {
                    dates.map((date) => (
                        <option key={date} value={date}>
                            {date}
                        </option>
                    ))
                }
            </select>
        </div>
    )
})
