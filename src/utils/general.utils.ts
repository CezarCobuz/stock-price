import {
    AlphaVantageConfig,
    EasyTimeSeries,
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

    return result.reverse();
};

export const createAlphaVantageRequestInfo = (
    config: AlphaVantageConfig
): string => {
    const PROVIDER = "https://www.alphavantage.co/";
    const API_KEY = "KSNP9BPJV1U322DK"; // devbackup: J4Z86NMG30HH5AJ3 //TODO: cycle through this APIS

    const { outputSize, stockSymbol, stockFunction } = config;

    const REQUEST_INFO = `${PROVIDER}query?function=${stockFunction}&symbol=${stockSymbol}&interval=5min&outputsize=${outputSize}&apikey=${API_KEY}`;

    return REQUEST_INFO;
};

export const computeAveragePrice = (stockData: EasyTimeSeries[]): number => {

    let prices = stockData.map((value) => value.price)
    let sum = prices.reduce((a, b) => a + b, 0)
    let average = sum / stockData.length

    return average
}
