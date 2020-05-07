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

  @observable.ref
  stockData = [] as EasyTimeSeries[];

  @action
  fetchStock() {
    let config: AlphaVantageConfig = {
      stockSymbol: this.userInputState.value,
      // TODO: get from user
      outputSize: "compact", // full
      stockFunction: "TIME_SERIES_MONTHLY", // TIME_SERIES_INTRADAY
    };

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
