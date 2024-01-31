import BackButton from "lassa-alert/components/BackButton";
import useAuth from "lassa-alert/hooks/useAuth";
import { useState } from "react";
import { SafeAreaView, Text, Touchable, TouchableOpacity, View } from "react-native"
import Toggle from 'react-native-toggle-input'

const SettingsScreen = () => {
    const [emailNotification, setEmailNotification] = useState(false)
    const [smsNotification, setSmsNotification] = useState(false)
    const { logout } = useAuth()
    return (
        <SafeAreaView className="bg-[#f1ecec] flex-1">
            <View className="px-4 my-4">
                <View className="my-4">
                    <BackButton title="Settings" />
                </View>
                <View className="mt-8">
                    <View className="flex flex-row justify-between items-center bg-white py-3 px-4 rounded-lg">
                        <Text>Email Notification</Text>
                        <Toggle
                            color={"#F1ECEC"}
                            size={25}
                            filled={true}
                            circleColor={"#40B885"}
                            toggle={emailNotification}
                            setToggle={() => setEmailNotification(!emailNotification)}
                        />
                    </View>
                    <View className="flex flex-row justify-between items-center bg-white py-3 px-4 rounded-lg">
                        <Text>SMS Notification</Text>
                        <Toggle
                            color={"#F1ECEC"}
                            size={25}
                            filled={true}
                            circleColor={"#40B885"}
                            toggle={smsNotification}
                            setToggle={() => setSmsNotification(!smsNotification)}
                        />
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={logout} className="mx-4 text-center flex justify-center items-center bg-white border-red-400 border py-2 rounded-lg">
                <Text className="font-bold text-lg">Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default SettingsScreen;