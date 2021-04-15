'use strict';
/**
 * Crypto price utilites.
 */
import { config } from './config';
import { buildQs, convertDate } from './utils';
import Axios from 'axios';

export const handler = async (event: any, context: any) => {
  try {
    const id = event.queryStringParameters.id;
    const amountInvested = event.queryStringParameters.amountInvested;
    const date = convertDate(event.queryStringParameters.date);

    if (!id || !parseInt(amountInvested) || !date) {
      return { statusCode: 400 };
    }

    const historicPrice = await getHistoricPrice(id, date);
    const numberOfTokens = amountInvested / historicPrice;
    const currentPrice = await getCurrentPrice(id);
    const currentValue = currentPrice * numberOfTokens;

    return {
      statusCode: 200,
      body: JSON.stringify({

        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      }, null, 2),
    };
  } catch (e: any) {
    return { statusCode: 500 };
  }
};

const getCurrentPrice = async (id: string): Promise<number> => {
  const currency = config.defaultCurrency;
  const qs = buildQs({
    ids: id,
    vs_currencies: currency,
  });
  const url = `${config.coingeckoApi}/simple/price${qs}`;
  const response = await Axios.get(url);
  if (response.status !== 200) {
    throw new Error('Error fetching data from CoinGecko Api');
  }
  return response.data[id][currency];
};

const getHistoricPrice = async (id: string, date: Date): Promise<number> => {
  const qs = buildQs({
    date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
  });
  const url = `${config.coingeckoApi}/coins/${id}/history${qs}`;
  const response = await Axios.get(url);
  if (response.status !== 200) {
    throw new Error('Error fetching data from CoinGecko Api');
  }
  console.log(url);
  return response.data.market_data.current_price[config.defaultCurrency];
}
