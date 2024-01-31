import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthData = {
    token: string;
    email: string;
    firstname: string;
    lastname: string;
    mobileNumber: string;
    deviceToken?: string;
};

export type AuthContextData = {
    authData?: AuthData;
    loading: boolean;
    saveUserData: (userData: AuthData) => Promise<void>;
    setAuthData: Dispatch<SetStateAction<AuthData>>
    logout: () => void;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export const authKey = '@AuthDataLassaAlert'

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData>();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      loadStorageData();
    }, []);
  
    async function loadStorageData(): Promise<void> {
      try {
        const authDataSerialized = await AsyncStorage.getItem(authKey);
        if (authDataSerialized) {
          const _authData: AuthData = JSON.parse(authDataSerialized);
          setAuthData(_authData);
        }
      } catch (error) {
          console.log(error)
      } finally {
        setLoading(false);
      }
    }
    const saveUserData = async (loginData) => {
      AsyncStorage.setItem(authKey, JSON.stringify(loginData));
      setAuthData(loginData)
    };
  
      const logout = () => {
        AsyncStorage.removeItem(authKey)
        setAuthData(null)
      }
  
    return (
      <AuthContext.Provider value={{ authData, loading, saveUserData, logout, setAuthData }}>
        {children}
      </AuthContext.Provider>
    );
  };