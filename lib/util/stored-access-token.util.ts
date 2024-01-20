import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoredAccessToken = {
    getAccessToken: async (): Promise<string | null> => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            return accessToken;
        } catch (error) {
            return null;
        }
    },

    setAccessToken: async (token: string): Promise<boolean> => {
        try {
            await AsyncStorage.setItem('accessToken', token);
            return true;
        } catch (error) {
            return false;
        }
    },

    setRefreshToken: async (token: string): Promise<boolean> => {
        try {
            await AsyncStorage.setItem('refreshToken', token);
            return true;
        } catch (error) {
            return false;
        }
    },
    clearAccessToken: async (): Promise<boolean> => {
        try {
            await AsyncStorage.removeItem('accessToken');
            return true;
        } catch (error) {
            return false;
        }
    },
};
