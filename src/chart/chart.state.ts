import { observable, action } from "mobx";
import { InputState } from "../input/input";
import {
    convertTimeSeries,
    createAlphaVantageRequestInfo,
} from "../utils/general.utils";
import {
    EasyTimeSeries,
    AlphaVantageConfig,
} from "../interfaces/general.interfaces";

export class ChartState {
    @observable
    userInputState = new InputState();

    @observable
    stockData = [] as EasyTimeSeries[];

    @action
    fetchStock() {
        let config: AlphaVantageConfig = {
            stockSymbol: this.userInputState.value,
            // TODO: get from user
            outputSize: "compact", // full
            stockFunction: "TIME_SERIES_MONTHLY", // TIME_SERIES_INTRADAY
        };

        // <!> Limits to: 5 API requests per minute; 500 API requests per day
        // https://www.alphavantage.co/premium/
        fetch(createAlphaVantageRequestInfo(config))
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data["Error Message"]) {
                    console.warn("<!> Error");
                } else {
                    let converted: EasyTimeSeries[] = convertTimeSeries(data);
                    this.stockData = converted;
                }
            });
    }
}
