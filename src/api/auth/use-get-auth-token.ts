import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';

type Variables = {
  USERNAME: string;
  PASSWORD: string;
  userTenantId: string;
};

type Response = {
  // This is going to be changed later
  base64EncodedAuthenticationKey: string;
};

export const useGetAuthToken = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: '/auth/token',
      method: 'POST',
      data: variables,
      headers: {
        'Authorization': 'Basic YWRtaW46b2ZiaXo=',
      },
    }).then((response) => response.data)
});