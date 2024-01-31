import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { BellAlertIcon, Cog8ToothIcon } from "react-native-heroicons/outline"
import { BarChart } from 'react-native-chart-kit'
import useAuth from "lassa-alert/hooks/useAuth"

const ProfileScreen = () => {
    const { authData } = useAuth()
    const { firstname, lastname, email, mobileNumber } = authData
    return (
        <SafeAreaView>
            <ScrollView className="bg-[#F5F5F5] pt-6">
                <View className="px-4 py-2 mx-4 rounded-md flex flex-row items-center justify-between">
                    <View>
                        <Text className="text-[#40B885] text-lg">Welcome,</Text>
                        <Text className="text-[#40B885] font-bold text-xl">{firstname} {lastname}</Text>
                        <Text className="text-[#40B885]">{email}</Text>
                    </View>
                </View>
                <View className="px-4 my-4">
                    <View>
                        <Text className="mb-2">First Name</Text>
                        <TextInput value={firstname} className="bg-white mb-1  p-4 rounded-lg"/>
                    </View>

                    <View>
                        <Text className="mb-2 mt-4">Last Name</Text>
                        <TextInput value={lastname} className="bg-white mb-1  p-4 rounded-lg"/>
                    </View>

                    <View>
                        <Text className="mb-2 mt-4">Email</Text>
                        <TextInput value={email} className="bg-white mb-1  p-4 rounded-lg"/>
                    </View>

                    <View>
                        <Text className="mb-2 mt-4">Phone Number</Text>
                        <TextInput value={`+${mobileNumber.toString()}`} className="bg-white mb-1  p-4 rounded-lg"/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default ProfileScreen;