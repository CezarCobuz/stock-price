import React, { useEffect } from 'react';
import './App.css';
import { observable } from 'mobx';
import { observer } from 'mobx-react'
import { Chart } from './chart/chart';
import { ChartState } from './chart/chart.state';
import { DateInterval, DateIntervalState } from './date-interval/date-interval';

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
        <>
            <Chart state={state.chartState} startIndex={state.startIndex} endIndex={state.endIndex} />

            {
                state.chartState.stockData.length !== 0 && <DateInterval state={state.dateIntervalState} />
            }

            <p>Date interval selected {state.dateIntervalState.startDropdownState.value} -> {state.dateIntervalState.stopDropdownState.value}</p>
            <p>Date interval index {state.dateIntervalState.startDropdownState.valueIndex} -> {state.dateIntervalState.stopDropdownState.valueIndex}</p>
            <p>Filtered Data length {state.dateIntervalState.stopDropdownState.valueIndex - state.dateIntervalState.startDropdownState.valueIndex}</p>
        </>
    )
})

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

