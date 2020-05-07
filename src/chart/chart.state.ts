import { observable, action } from "mobx";
import { InputState } from "../input/input";
import { convertTimeSeries, EasyTimeSeries } from "../utils/general.utils";

export class ChartState {
  @observable
  userInputState = new InputState();

  @observable.ref
  stockData = [] as EasyTimeSeries[];

  @action
  fetchStock() {
    const API_KEY: string = "KSNP9BPJV1U322DK";
    const OUTPUT_SIZE: string = "compact"; // full

    console.log("+++ this.userInputState", this.userInputState.value);

    const STOCK_SYMBOL: string = this.userInputState.value;

    const STOCK_FUNCTION: string = 'TIME_SERIES_MONTHLY' // TIME_SERIES_INTRADAY
    // const API_CALL: string =
    //     `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&outputsize=${OUTPUT_SIZE}&apikey=${API_KEY}`
    const API_CALL: string = `https://www.alphavantage.co/query?function=${STOCK_FUNCTION}&symbol=${STOCK_SYMBOL}&interval=5min&outputsize=${OUTPUT_SIZE}&apikey=${API_KEY}`;

    fetch(API_CALL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data["Error Message"]) {
          console.warn("<!> Error");
        }
        console.log("+++ original API data", data);

        let converted: EasyTimeSeries[] = convertTimeSeries(data);
        console.log('+++ converted', converted);
        this.stockData = converted
      });
  }
}
