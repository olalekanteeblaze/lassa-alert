import { ApiClient } from '../api-client';

/**
 * NotificationApiService
 * for all notification api calls
 */
export const NotificationApiService = {
    subscribe: (email: string, deviceToken: string) => {
        return ApiClient.post('/notifications/subscribe', { userEmail: email, deviceSubscriptionToken: deviceToken });
    },

    getNotifications: () => {
        return ApiClient.get('/notifications/outbreak-predictions');
    }
};
