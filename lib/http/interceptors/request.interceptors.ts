/**
 * Axios client request interceptors
 */

import { InternalAxiosRequestConfig } from 'axios';
import { StoredAccessToken } from 'lassa-alert/lib/util/stored-access-token.util';

export const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
    const accessToken = await StoredAccessToken.getAccessToken();
    console.log(config.data, 'access token');
    return {
        ...config,
        headers: {
            ...config.headers,
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        ...(config.data ? { data: config.data } : {}),
    };
};
