import React from 'react'
import { observer } from 'mobx-react'
import { Input } from '../input/input'
import { ChartState } from './chart.state'

// TODO: replace with real data after filtering
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ReferenceLine } from 'recharts'
import { computeAveragePrice } from '../utils/general.utils'

interface Props {
    state: ChartState,
    startIndex?: number,
    endIndex?: number
}

/**
 * User provides a stock symbol
 * The price of the stock plotted on a chart
 * Customizable time period shown in the chart
 * Overlay an average on the chart
 *
 * examples and documentation: http://recharts.org/en-US/examples
 */
export const Chart: React.FC<Props> = observer(({ state, startIndex = 0, endIndex = 0 }) => {

    let stockData = state.stockData

    if (startIndex || endIndex) {
        stockData = stockData.slice(startIndex, endIndex)
    }

    let averagePrice = computeAveragePrice(stockData)


    return <>
        <Input state={state.userInputState} />
        <button onClick={() => state.fetchStock()}>Fetch Stock Data</button>

        {stockData.length !== 0 &&
            <LineChart width={1000} height={300} data={stockData}>
                <XAxis dataKey='date' />
                <YAxis dataKey='price' />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="date" stroke="#8884d8" />
                <Line type="monotone" dataKey="price" stroke="#82ca9d" />
                <Tooltip />
                <ReferenceLine y={averagePrice} label={`avg: ${averagePrice.toFixed(4)}`} stroke="coral" strokeDasharray='5 5' />
                {/* TODO: investigate xAxis tick formatter https://github.com/recharts/recharts/issues/1028 */}
            </LineChart>
        }
    </>
})
