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
import HomeScreen from './screens/HomeScreen';
import MainScreen from './screens/MainScreen';
import SettingsScreen from './screens/SettingsScreen';
import NotificationScreen from './screens/NotificationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
  )
}
export const AuthStack = () => { 

}
export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <ToastProvider>
          <Routes />
        </ToastProvider>
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
