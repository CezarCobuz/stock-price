export interface EasyTimeSeries {
  date: string;
  price: number;
}

/** @param data as received from alphavantage API  */
export const convertTimeSeries = (data: any): EasyTimeSeries[] => {
  let result: EasyTimeSeries[] = [];

  console.log("+++ data TBF", data);

  // FIXME: Do a smarter access of the Time Series field
  //   console.log("+++ data to be filtered", data["Time Series (5min)"]);
  //   const timeSeries = data["Time Series (5min)"];

  const timeSeries = data["Monthly Time Series"];

  Object.keys(timeSeries).forEach((date) => {
    // console.log("+++ date", date);
    // console.log("+++ timeSeries[date]", timeSeries[date]);

    let item: EasyTimeSeries = {
      date: date,
      price: parseFloat(timeSeries[date]["1. open"]),
    };

    result.push(item);
  });

  console.log("+++ result", result);
  return result;
};
