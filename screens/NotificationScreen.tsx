import BackButton from "lassa-alert/components/BackButton";
import { useGetNotifications } from "lassa-alert/queries/notification.queries";
import { format } from 'date-fns'
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import Toggle from 'react-native-toggle-input'
import { useNavigation } from "@react-navigation/native";

const NotificationScreen = () => {
    const { data, isFetching, refetch, isRefetching } = useGetNotifications();
    const { navigate } = useNavigation()
    const notifications = data?.data || []
    return (
        <SafeAreaView className="bg-[#f1ecec] flex-1">
            <View className="px-4 my-4">
                <View className="">
                    <BackButton title="Notifications" />
                </View>
                {isFetching && !isRefetching && <ActivityIndicator size="large" color="#40B885" />}
                <FlatList
                    data={notifications}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => navigate('Prediction', { prediction: item })} key={item.id} className="flex flex-row justify-between items-center mt-3 bg-white py-4 px-4 rounded-lg">
                                <Text className="overflow-clip w-[250px]">{item.title} {item.subtitle}</Text>
                                <Text className="text-xs text-[#626262]">{format(item.createdAt, 'MMM d, y')}</Text>
                            </TouchableOpacity> 
                        )
                    }}
                    onRefresh={refetch}
                    refreshing={isRefetching}
                />
            </View>
        </SafeAreaView>
    )
}
export default NotificationScreen;