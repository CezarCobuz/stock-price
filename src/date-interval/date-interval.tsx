import { observable, action } from 'mobx'
import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { Dropdown, DropdownState } from './dropdown';
import { appState } from '../App';
import { EasyTimeSeries } from '../interfaces/general.interfaces';
import { SpacingComponent } from '../ui/spacing.component';
import './date-interval.css'

export class DateIntervalState {
    @observable
    startDates = [] as string[]

    @observable
    endDates = [] as string[]

    @observable
    startDropdownState = new DropdownState();

    @observable
    stopDropdownState = new DropdownState();

    @action
    filterDates = (stockData: EasyTimeSeries[]) => {
        this.startDates = stockData.map(eachStockData => eachStockData.date)

        // TODO: only display dates after start
        this.endDates = stockData.map(eachStockData => eachStockData.date)
    }

    @action
    setDateInterval = (indexStart: number, indexStop: number) => {
        if (indexStart < indexStop) {
            appState.startIndex = indexStart
            appState.endIndex = indexStop
        } else {
            // TODO: Add a pretty warning component
            console.warn('Index of start date must be smaller then index of stop date')
        }
    }
}

export const DateInterval: React.FC<{ state: DateIntervalState }> = observer(({ state }) => {

    useEffect(() => {
        state.filterDates(appState.chartState.stockData)
    }, [])

    let { startDropdownState, stopDropdownState, startDates, endDates } = state

    return (
        <>
            <p>Select Date Interval</p>
            <SpacingComponent bottom>
                <div className='DatesSelectorsContainer'>
                    <Dropdown state={startDropdownState} dates={startDates} />
                    <SpacingComponent left>
                        <Dropdown state={stopDropdownState} dates={endDates} />
                    </SpacingComponent>
                </div>

            </SpacingComponent>


            <button
                onClick={() => state.setDateInterval(startDropdownState.valueIndex, stopDropdownState.valueIndex)}>
                Filter Date Interval
            </button>
        </>
    )
})