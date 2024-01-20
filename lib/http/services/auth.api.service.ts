import { ApiClient } from '../api-client';

/**
 * AuthApiService
 * for all authentication api calls
 */
export const AuthApiService = {
    login: (email: string, password: string) => {
        return ApiClient.post('/auth/login', { email, password });
    },
    register: (data) => {
        return ApiClient.post<{ token: string }>('/users', data);
    },
    validateOtp: (data) => {
        return ApiClient.put('/otp', data);
    }
};
