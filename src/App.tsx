import React from 'react';
import './App.css';
import { observable } from 'mobx';
import { observer } from 'mobx-react'
import { Chart } from './chart/chart';
import { ChartState } from './chart/chart.state';

class AppState {
  @observable
  chartState = new ChartState()
}

export const appState = new AppState()

export const App: React.FC<{ state: AppState }> = observer(({ state }) => {
  return (
    <>
      <Chart state={state.chartState} />
      <div> chartState: {state.chartState.userInputState.value} </div>
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

