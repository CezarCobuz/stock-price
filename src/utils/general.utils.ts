import {
    EasyTimeSeries,
    AlphaVantageConfig,
} from "../interfaces/general.interfaces";

/** @param data as received from alphavantage API  */
export const convertTimeSeries = (data: any): EasyTimeSeries[] => {
    let result: EasyTimeSeries[] = [];

    // FIXME: Do a smarter access of the Time Series field
    //   console.log("+++ data to be filtered", data["Time Series (5min)"]);
    //   const timeSeries = data["Time Series (5min)"];

    const timeSeries = data["Monthly Time Series"];

    Object.keys(timeSeries).forEach((date) => {
        let item: EasyTimeSeries = {
            date: date,
            price: parseFloat(timeSeries[date]["1. open"]),
        };

        result.push(item);
    });

    console.log("+++ result", result);
    return result.reverse();
};

export const createAlphaVantageRequestInfo = (
    config: AlphaVantageConfig
): string => {
    const PROVIDER = "https://www.alphavantage.co/";
    const API_KEY = "KSNP9BPJV1U322DK";

    const { outputSize, stockSymbol, stockFunction } = config;

    const REQUEST_INFO = `${PROVIDER}query?function=${stockFunction}&symbol=${stockSymbol}&interval=5min&outputsize=${outputSize}&apikey=${API_KEY}`;

    return REQUEST_INFO;
};
