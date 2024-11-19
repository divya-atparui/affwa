import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { type IndividualProductDataResponse } from '@/types';

import { client } from '../common';




type Variables = {
  productId: string;
};
type Response = IndividualProductDataResponse;

const productUrl = '/rest/services/findProductById';


export const useGetIndividualProducts = createQuery<
  Response,
  Variables,
  AxiosError
>({

  queryKey: ['individualProducts'],
  fetcher: async (variables) => {
    const params = {
      inParams: JSON.stringify({
        idToFind: variables.productId, // Replace this with variables.productId if dynamic
      }),
    };

    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${productUrl}?${queryString}`;

    console.log(fullUrl)
//     console.log(productUrl)r
// const bool= fullUrl == productUrl

    try {
      const response = await client(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-PrivateTenant': 'affwa',
        }
      });
      // console.log(response.data); // Debugging the response
      return response.data;
    } catch (error) {
      console.error('Error with Axios fetch:', error);
      throw error; // Ensures React Query handles the error
    }
  },
});
