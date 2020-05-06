import React from 'react'
import { observer } from 'mobx-react'
import { Input } from '../input/input'
import { ChartState } from './chart.state'

// TODO: replace with real data after filtering
import { pricesMock } from '../mocks/prices.mock'
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts'
/**
 * User provides a stock symbol
 * The price of the stock plotted on a chart
 * Customizable time period shown in the chart
 * Overlay an average on the chart
 */
export const Chart: React.FC<{ state: ChartState }> = observer(({ state }) => {
    return <>
        <Input state={state.userInputState} />
        <button onClick={() => state.fetchStock()}>Fetch Stock Data</button>
        <LineChart width={500} height={300} data={pricesMock}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="date" stroke="#8884d8" />
            <Line type="monotone" dataKey="price" stroke="#82ca9d" />
        </LineChart>
    </>
})
