import React, { useEffect } from 'react';
import './App.css';
import './ui/button.css';

import { observable } from 'mobx';
import { observer } from 'mobx-react'
import { Chart } from './chart/chart';
import { ChartState } from './chart/chart.state';
import { DateInterval, DateIntervalState } from './date-interval/date-interval';
import { SpacingComponent } from './ui/spacing.component';

class AppState {
    @observable
    chartState = new ChartState()

    @observable
    dateIntervalState = new DateIntervalState()

    @observable
    startIndex = 0

    @observable
    endIndex = 0
}

export const appState = new AppState()

export const App: React.FC<{ state: AppState }> = observer(({ state }) => {

    // Default value
    useEffect(() => {
        state.chartState.userInputState.value = 'amzn'
        state.chartState.fetchStock()
    }, [])

    return (
        <div className='App'>
            <SpacingComponent top>
                <Chart state={state.chartState} startIndex={state.startIndex} endIndex={state.endIndex} />
            </SpacingComponent>

            {
                state.chartState.stockData.length !== 0 && <DateInterval state={state.dateIntervalState} />
            }

            {/* TODO: infoBoxComponent with bellow */}
            {/* <p>Date interval selected {state.dateIntervalState.startDropdownState.value} -> {state.dateIntervalState.stopDropdownState.value}</p>
            <p>Date interval index {state.dateIntervalState.startDropdownState.valueIndex} -> {state.dateIntervalState.stopDropdownState.valueIndex}</p>

            <p>Filtered Data length {state.dateIntervalState.stopDropdownState.valueIndex - state.dateIntervalState.startDropdownState.valueIndex}</p> */}
        </div>
    )
})
