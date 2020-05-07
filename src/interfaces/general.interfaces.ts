export interface EasyTimeSeries {
    date: string;
    price: number;
}

export interface AlphaVantageConfig {
    stockSymbol: string;
    outputSize: string;
    stockFunction: string;
}
