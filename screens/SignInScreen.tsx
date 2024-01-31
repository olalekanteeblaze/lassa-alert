import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSignInUser } from "lassa-alert/queries/auth.queries";
import { RootStackParamList } from "lassa-alert/types/root-stack.type";
import { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "react-native-toast-notifications";

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignInScreen: React.FC<Props> = ({ navigation }) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const { mutate: signInUser, isLoading } = useSignInUser()
    const toast = useToast()
    const changeText = (key: string, value: string) => {
        setLoginData({
            ...loginData,
            [key]: value
        })
    }
    const handleSignIn = () => {
        signInUser(loginData, {
            onError: (err) => {
                toast.show(err.response.data.message as string || 'An error occured', {
                    type: 'danger',
                })
            }
        })
    }
    return (
        <KeyboardAwareScrollView className="mt-32">
            <Text className="pl-8 pt-2 text-3xl font-bold text-[#40B885]">Sign In</Text>
            <View>
                <KeyboardAvoidingView className="w-full max-w-lg p-8 pb-6 space-y-3" behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View className='mb-3'>
                        <Text className='text-sm mb-2'>Email</Text>
                        <TextInput
                            placeholder="Email"
                            keyboardType='email-address'
                            className="bg-gray-200 mb-1  p-4 rounded-lg border-red-500"
                            onChangeText={(text) => changeText('email', text)}
                            value={loginData.email}
                        />
                        {/* {touched && !signupData.firstname ? <Text className='color-red-600'>First Name field is mandatory</Text> : null} */}
                    </View>

                    <View className='mb-3'>
                        <Text className='text-sm mb-2'>Password</Text>
                        <TextInput
                            placeholder="***********"
                            secureTextEntry
                            keyboardType='default'
                            className="bg-gray-200 mb-1  p-4 rounded-lg border-red-500"
                            onChangeText={(text) => changeText('password', text)}
                            value={loginData.password}
                        />
                        {/* {touched && !signupData.firstname ? <Text className='color-red-600'>First Name field is mandatory</Text> : null} */}
                    </View>

                    {/* <TouchableOpacity className="p-3" onPress={() => {
                        // navigate('RequestOtp', { phone: loginData.phone })
                        }}>
                        <Text className="text-right text-xs text-[#40B885]">Forgot Password?</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity 
                        onPress={handleSignIn}
                        disabled={isLoading}
                        className="bg-[#40B885] items-center justify-center p-3 rounded-md mt-10"
                    >
                        {isLoading ? <ActivityIndicator size="small" color="white" /> :
                        <Text className="text-xl text-white font-bold ">Sign In </Text> }
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={()=>{
                        navigation.navigate('Signup')
                    }}
                    >
                        <Text className="text-center text-xs">You don't have an account? 
                            <Text className="text-[#40B885] font-bold "> Sign Up</Text> 
                        </Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                        onPress={()=>{
                            // navigation.navigate('SignIn')
                        }}
                        className="mt-1 mb-3"
                        >
                        <Text className="text-center text-xs">Already have an account? 
                            <Text className="text-[#40B885] font-bold "> Sign In</Text> 
                        </Text>
                    </TouchableOpacity> */}

                </KeyboardAvoidingView>
            </View>
        </KeyboardAwareScrollView>
    );
}
export default SignInScreen;