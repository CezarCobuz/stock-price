import { observable, action } from 'mobx'
import React from 'react'
import { observer } from 'mobx-react'
import { InputState, Input } from '../input/input'

export class ChartState {
    @observable
    userInputState = new InputState()

    @observable
    stockData = ''

    @action
    fetchStock() {
        const API_KEY: string = 'KSNP9BPJV1U322DK'
        const OUTPUT_SIZE: string = 'compact' // full

        console.log('+++ this.userInputState', this.userInputState.value);

        const STOCK_SYMBOL: string = this.userInputState.value
        // const API_CALL: string =
        //     `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&outputsize=${OUTPUT_SIZE}&apikey=${API_KEY}`
        const API_CALL: string =
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${STOCK_SYMBOL}&interval=5min&outputsize=${OUTPUT_SIZE}&apikey=${API_KEY}`

        fetch(API_CALL)
            .then(
                (res) => {
                    return res.json();
                }
            )
            .then(
                (data) => {
                    if (data['Error Message']) {
                        console.warn('<!> Error')
                    }
                    console.log('+++ data', data);

                    this.stockData = data
                }
            )
    }
}

/** User provides a stock symbol */
export const Chart: React.FC<{ state: ChartState }> = observer(({ state }) => {
    return <>
        <Input state={state.userInputState} />
        <button onClick={() => state.fetchStock()}>Fetch Stock Data</button>
    </>
})
