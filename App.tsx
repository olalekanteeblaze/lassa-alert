import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastProvider } from 'react-native-toast-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './screens/SignupScreen';
import SignInScreen from './screens/SignInScreen';
import OtpScreen from './screens/OtpScreen';
import { RootStackParamList } from './types/root-stack.type';
import MainScreen from './screens/MainScreen';
import SettingsScreen from './screens/SettingsScreen';
import NotificationScreen from './screens/NotificationScreen';
import useAuth from './hooks/useAuth';
import registerForPushNotificationsAsync from './notification';
import { useEffect } from 'react';
import FullPageLoader from './components/FullPageLoader';
import { AuthProvider } from './contexts/AuthContext';
import { useSubscribe } from './queries/notification.queries';
import PredictionScreen from './screens/PredictionScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  const { authData, loading } = useAuth()
  const { mutate } = useSubscribe()
  // const { mutate } = useMutation(updateDeviceToken, {})

  const handleNotification = async () => {
    const deviceToken = await registerForPushNotificationsAsync()
    mutate({ email: authData?.email, deviceToken })
  }
  useEffect(() => {
    handleNotification()
  },[authData?.token])

  if (loading) {
    return <FullPageLoader />;
  }
  return (
    authData?.token ? <AppStack /> : <AuthStack />
  )
}
export const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="Prediction" component={PredictionScreen} />
    </Stack.Navigator>
  )
}
export const AuthStack = () => { 
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
    </Stack.Navigator>
  )
}
export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar style="auto" />
          <ToastProvider>
            <Routes />
          </ToastProvider>
        </AuthProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
