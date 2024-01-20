/**
 * Configure axios client with default parameters for every request
 * baseUrl - string (From environement variables)
 * Authorization - string
 * Content-Type - 'application/json
 */

import axios, { AxiosRequestConfig } from 'axios';
// import Config from 'react-native-config';
import { requestInterceptor, responseInterceptor } from './interceptors';
import { IApiClient } from 'lassa-alert/types/api-client.type';

// helper function to create new instance of axios client on demand
export const createApiClient = () => {
    const AxiosInstance = axios.create({
        baseURL: 'https://lassa-alert-system-29e01ab50dd3.herokuapp.com/api/v1',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        paramsSerializer: (params) => {
            const searchParams = new URLSearchParams();

            const paramsKeys = Object.keys(params || {});
            paramsKeys.forEach((key) => {
                const value = params[key];
                if (Array.isArray(value)) {
                    value.forEach((currentValue) => {
                        searchParams.append(key, currentValue);
                    });
                } else {
                    searchParams.append(key, value);
                }
            });

            return searchParams.toString();
        },
    });

    // configure request interceptors
    // @ts-ignore
    AxiosInstance.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error));

    // configure response interceptors
    AxiosInstance.interceptors.response.use(responseInterceptor, (error) => Promise.reject(error));
    // AxiosInstance.interceptors.response.use(responseInterceptor, (error) => {
    //     console.log(error.response.data.message, 'error message');
    //     return Promise.reject(error);
    // });

    // custom ApiClient object
    const ApiClient: IApiClient = {
        get: async (url: string, _config?: AxiosRequestConfig) => {
            const response = await AxiosInstance.get(url, _config);
            return response?.data!;
        },
        post: async (url: string, data?: any, _config?: AxiosRequestConfig) => {
            const response = await AxiosInstance.post(url, data, _config);
            return response?.data!;
        },
        put: async (url: string, data?: any, _config?: AxiosRequestConfig) => {
            console.log(data, 'data')
            const response = await AxiosInstance.put(url, data, _config);
            return response?.data!;
        },
        delete: async (url: string, _config?: AxiosRequestConfig) => {
            const response = await AxiosInstance.delete(url, _config);
            return response?.data!;
        },
    };

    return ApiClient;
};

// create default global axios client instance
export const ApiClient = createApiClient();
