import { observable, action } from 'mobx'
import React from 'react'
import { observer } from 'mobx-react'
import { InputState, Input } from '../input/input'

export class ChartState {
    @observable
    userInputState = new InputState()
}

/** User provides a stock symbol */
export const Chart: React.FC<{ state: ChartState }> = observer(({ state }) => {
    return <>
        <Input state={state.userInputState} />
    </>
})
