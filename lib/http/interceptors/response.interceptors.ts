/**
 * Axios client response interceptors
 */

import { AxiosResponse } from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
    return {
        ...response,
        data: response.data,
    };
};
