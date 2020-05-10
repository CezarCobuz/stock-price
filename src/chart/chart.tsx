import './chart.css';

import { CartesianGrid, Label, Line, LineChart, ReferenceLine, Tooltip, XAxis, YAxis } from 'recharts'

import { ChartState } from './chart.state'
import { Input } from '../input/input'
import React from 'react'
import { SpacingComponent } from '../ui/spacing.component'
import { computeAveragePrice } from '../utils/general.utils'
import { observer } from 'mobx-react'
import { useWindowDimensions } from '../utils/dimensions.utils';

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

    const {height, width} = useWindowDimensions()

    return (
        <div className='Chart'>

            <SpacingComponent bottom>
                <div className='SymbolContainer'>
                    <Input state={state.userInputState} />
                    <SpacingComponent left>
                        <button className='Button' onClick={() => state.fetchStock()}>Fetch Stock Data</button>
                    </SpacingComponent>
                </div>
            </SpacingComponent>

            {stockData.length !== 0 &&
                <LineChart width={width * 0.8} height={height * 0.5} data={stockData}>
                    <XAxis dataKey='date' />
                    <YAxis dataKey='price' />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="price" stroke="darkcyan" />
                    <Tooltip />
                    <ReferenceLine y={averagePrice} stroke="sandybrown" strokeDasharray='5 10'>
                        <Label value={`avg: ${averagePrice.toFixed(4)}`} position='insideLeft' fill='coral' fontWeight='bold' />
                    </ReferenceLine>
                    {/* TODO: investigate xAxis tick formatter https://github.com/recharts/recharts/issues/1028 */}
                </LineChart>
            }
        </div>
    )
})
