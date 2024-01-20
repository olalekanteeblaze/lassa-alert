import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../types/screens";
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator, Pressable, Keyboard } from 'react-native'
// import OtpInput from "../components/OtpInput";
import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
// import { toMinutesSeconds } from "../utils";
import { useMutation } from "react-query";
// import { resendOtp, verifyOtp } from "../mutations/auth";
// import { useToast } from "react-native-toast-notifications";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import OtpInput from "../components/OtpInput";
import { toMinutesSeconds } from "./utils";
import { useValidateOtp } from "lassa-alert/queries/auth.queries";
import { useToast } from "react-native-toast-notifications";

// type OtpScreenProps = NativeStackScreenProps<RootStackParamList, 'Otp'>;

const OtpScreen: React.FC = ({ route, navigation }: any) => {
    // const { phone, userId } = route.params
    const phone = '08123456789'
    const { mutate: validateOtp, isLoading } = useValidateOtp()
    const [otp, setOtp] = useState('')
    const toast = useToast()
    const [index, setIndex] = useState(null)
    const getOtp = (otp: string) => {
        setOtp(otp)
        if(otp.length === 6) {
            verifyUser({ otp })
        }
    }

    const [timer, setTimer] = useState(180)
    // const { mutate, isLoading } = useMutation(verifyOtp, {
    //     onSuccess(data) {
    //         const { success, errorMessage, message } = data
    //         if(!success) { 
    //             toast.show(errorMessage, { type: 'danger' })
    //             setIndex(3)
    //         }
    //         if(success){
    //             toast.show(message, { type: 'success' })
    //             navigation.navigate('SignIn')
    //         }
    //     },
    // })
    // const { mutate: resendOtpMutate } = useMutation(resendOtp, {
    //     onSuccess(data) {
    //         const { success, message, status } = data
    //         if(success || status) toast.show(message, { type: 'success' })
    //     },
    // })
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((timer) => timer > 0 ? timer - 1 : 0)
        }, 1000)
        return () => clearInterval(interval)
    },[])
    const handleResendCode = () => {
        // resendOtpMutate({ userId })
        setTimer(180)
    }
    const verifyUser = ({ otp }) =>  {
        validateOtp({ otpCode: otp }, {
            onSuccess: () => {
                navigation.navigate('SignIn')
            },
            onError: (err) => {
                console.log(err, 'err');
                toast.show(err.response.data.message as string || 'An error occured', {
                    type: 'danger',
                })
            }
        })
    }
    return (
        <SafeAreaView>
            <ExpoStatusBar style="dark"  />
            <Pressable className="px-8 mt-6">
                <BackButton />
            </Pressable>
             <Pressable className="text-center mt-32" onPress={() => Keyboard.dismiss()}>
                <Text className="pl-8 pt-2 text-3xl font-bold text-[#40B885]">Authentication</Text>
                <OtpInput getOtp={getOtp} index={index} />
                <View className="px-20">
                    <TouchableOpacity 
                        className="bg-[#40B885] items-center justify-center shadow-2xl mb-8 shadow-slate-200 p-3 rounded-full mt-40"
                        onPress={() => verifyUser({ otp })}
                        disabled={otp.length < 6}
                    >
                       {false ? <ActivityIndicator size="small" color="white" /> : <Text className="text-xl text-white font-bold ">Verify</Text>}
                    </TouchableOpacity>

                    <Text className="text-center">You can resend code in <Text className="font-bold text-[#40B885]">{toMinutesSeconds(timer)}</Text></Text>
                    <TouchableOpacity 
                        className="items-center justify-center shadow-2xl shadow-slate-200 p-3 rounded-full"
                        disabled={timer !== 0}
                        onPress={handleResendCode}
                    >
                        <Text className="text-xl text-[#40B885] font-bold ">Resend Code</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </SafeAreaView>
    )
}
export default OtpScreen