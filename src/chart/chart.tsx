import React from 'react'
import { observer } from 'mobx-react'
import { Input } from '../input/input'
import { ChartState } from './chart.state'

// TODO: replace with real data after filtering
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts'
/**
 * User provides a stock symbol
 * The price of the stock plotted on a chart
 * Customizable time period shown in the chart
 * Overlay an average on the chart
 */
export const Chart: React.FC<{ state: ChartState }> = observer(({ state }) => {
    let stockData = state.stockData

    return <>
        <Input state={state.userInputState} />
        <button onClick={() => state.fetchStock()}>Fetch Stock Data</button>

        {stockData.length ?
            <LineChart width={1000} height={300} data={stockData}>
                <XAxis dataKey='date' />
                <YAxis dataKey='price' />
                {/* <CartesianGrid stroke="#eee" strokeDasharray="5 5" /> */}

                <Line type="monotone" dataKey="date" stroke="#8884d8" />
                <Line type="monotone" dataKey="price" stroke="#82ca9d" />
            </LineChart>
            : null
        }
    </>
})
