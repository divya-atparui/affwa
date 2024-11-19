import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { type ProductResponse } from '@/types';


type Response = ProductResponse;
type Variables = void;

const productUrl = 'https://affwa.atparui.com/rest/services/newPerformFind';
export const useGetProducts = createQuery<Response, Variables, AxiosError>({
  queryKey: ['products'],
  fetcher: async () => {
    const params = {
      inParams: JSON.stringify({
        inputFields: {},
        ProdCatalog: 'affwa_catalog',
        ProductCategory: 'Affwa',
        entityName: 'Product',
        viewIndex: 0,
        noConditionFind: 'Y',
      }),
    };

    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${productUrl}?${queryString}`;

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-PrivateTenant': 'affwa',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  },
});
