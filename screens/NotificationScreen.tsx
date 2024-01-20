import BackButton from "lassa-alert/components/BackButton";
import { SafeAreaView, ScrollView, Text, View } from "react-native"
import Toggle from 'react-native-toggle-input'

const NotificationScreen = () => {
    return (
        <SafeAreaView className="bg-[#f1ecec] flex-1">
            <View className="px-4 my-4">
                <View className="">
                    <BackButton title="Notifications" />
                </View>
                <ScrollView className="my-8">
                    {new Array(27).fill(0).map((_, i) => (
                        <View key={i} className="flex flex-row justify-between items-center bg-white py-4 px-4 rounded-lg">
                            <Text>Notification {i + 1}</Text>
                            <Text className="text-xs text-[#626262]">12:00, April 24</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
export default NotificationScreen;