import { ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRegister } from "lassa-alert/queries/auth.queries";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "lassa-alert/types/root-stack.type";
import { useToast } from "react-native-toast-notifications";

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
    const { mutate: register, isLoading } = useRegister();
    const [touched, setTouched] = useState(false);
    const toast = useToast();
    const [signupData, setData] = useState({
        firstname: '',
        lastname: '',
        mobileNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    
    const changeText = (key: string, value: string) => {
        setData({
            ...signupData,
            [key]: value
        })
    }
    const handleSignup = () => {
        setTouched(touched)
        register({ ...signupData, mobileNumber: `234${signupData.mobileNumber.substring(1)}` }, {
            onSuccess: (data) => {
                console.log(data)
                navigation.navigate('Otp')
            },
            onError: (err) => {
                toast.show(err.response.data.message as string || 'An error occured', {
                    type: 'danger',
                })
            }
        })
    }
    const emailRegex = new RegExp('^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
    return (
        <KeyboardAwareScrollView  contentContainerStyle={{flex: 1}} className="mt-8"  enableOnAndroid={true}>
            <ScrollView>
            <Text className="pl-8 pt-2 text-3xl font-bold text-[#40B885]">Register</Text>
            <View className="pb-8">
                <KeyboardAvoidingView className="w-full max-w-lg p-8 pb-6 space-y-3" behavior={"height"}>
                    <View className='mb-3'>
                        <Text className='text-sm mb-2'>First Name</Text>
                        <TextInput
                            placeholder="Your First Name"
                            keyboardType='default'
                            className="bg-gray-200 mb-1  p-4 rounded-lg border-red-500"
                            onChangeText={(text) => changeText('firstname', text)}
                            value={signupData.firstname}
                        />
                        {touched && !signupData.firstname ? <Text className='color-red-600'>First Name field is mandatory</Text> : null}
                    </View>

                    <View className='mb-3'>
                        <Text className='text-sm mb-2'>Last Name</Text>
                        <TextInput
                            placeholder="Your Last Name"
                            keyboardType='default'
                            className="bg-gray-200 mb-1  p-4 rounded-lg border-red-500"
                            onChangeText={(text) => changeText('lastname', text)}
                            value={signupData.lastname}
                        />
                        {touched && !signupData.lastname ? <Text className='color-red-600'>Last Name field is mandatory</Text> : null}
                    </View>

                    <View className='mb-3'>
                        <Text className='text-sm mb-2'>Email</Text>
                        <TextInput
                            placeholder="Your First Name"
                            keyboardType='default'
                            className="bg-gray-200 mb-1  p-4 rounded-lg border-red-500"
                            onChangeText={(text) => changeText('email', text)}
                            value={signupData.email}
                        />
                        {signupData.email && !emailRegex.test(signupData.email) ? <Text className='color-red-600'>Email is invalid</Text> : null}
                    </View>

                    <View className='mb-3'>
                        <Text className='text-sm mb-2'>Phone number</Text>
                        <TextInput
                            placeholder="Your First Name"
                            keyboardType='default'
                            className="bg-gray-200 mb-1  p-4 rounded-lg border-red-500"
                            onChangeText={(text) => changeText('mobileNumber', text)}
                            value={signupData.mobileNumber}
                        />
                        {touched && !signupData.mobileNumber ? <Text className='color-red-600'>Mobile Number field is mandatory</Text> : null}
                    </View>

                    <View className='mb-3'>
                        <Text className='text-sm mb-2'>Password</Text>
                        <TextInput
                            placeholder="***********"
                            keyboardType='default'
                            secureTextEntry
                            className="bg-gray-200 mb-1  p-4 rounded-lg border-red-500"
                            onChangeText={(text) => changeText('password', text)}
                            value={signupData.password}
                        />
                       {signupData.password && signupData.password.length < 8 ? <Text className='color-red-600'>Password must be at least 8 characters</Text> : null}
                    </View>

                    <View className='mb-3'>
                        <TextInput 
                        placeholder="Confirm Password"
                        secureTextEntry
                        className="mb-1 bg-gray-200  p-4 rounded-lg border-red-500"
                        onChangeText={(text) => changeText('confirmPassword', text)}
                        value={signupData.confirmPassword}
                        />
                        {signupData.confirmPassword && signupData.confirmPassword !== signupData.password ? <Text className='color-red-600'>Passwords don't match</Text>: null}
                    </View>

                    <Text className="text-center text-xs mt-3" >By clicking on Sign Up you have agreed with our terms and Conditions.</Text> 

                    <TouchableOpacity 
                        onPress={handleSignup}
                        disabled={isLoading}
                        className="bg-[#40B885] items-center justify-center p-3 rounded-md mt-10"
                    >
                        {isLoading ? <ActivityIndicator size="small" color="white" /> :
                        <Text className="text-xl text-white font-bold ">Sign Up </Text> }
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>{
                           navigation.navigate('SignIn')
                        }}
                        className="mt-1 mb-8"
                        >
                        <Text className="text-center text-xs">Already have an account? 
                            <Text className="text-[#40B885] font-bold "> Sign In</Text> 
                        </Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
            </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
}
export default SignupScreen;