import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { BellAlertIcon, Cog8ToothIcon } from "react-native-heroicons/outline"
import { BarChart } from 'react-native-chart-kit'
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const data = {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43, 34]
          }
        ]
    };
    const navigation = useNavigation()
    return (
        <SafeAreaView>
            <ScrollView className="bg-[#F5F5F5] pt-6">
                {/* <Text>Home screen</Text> */}
                <View className="bg-[#40B885] px-4 py-2 mx-4 rounded-md flex flex-row items-center justify-between">
                    <View>
                        <Text className="text-white text-lg">Welcome,</Text>
                        <Text className="text-white font-bold text-xl">Jane Doe</Text>
                        <Text className="text-white">Jane@doe.com</Text>
                    </View>
                    <View className="flex flex-row">
                        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                            <BellAlertIcon color={'white'} size={30} style={{ marginRight: 4 }} className="text-white w-8 h-8" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                            <Cog8ToothIcon color={'white'} size={30} className="text-white w-8 h-8" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="px-4 py-8">
                    <Text>Showing overview for the last 7 days</Text>
                    <View className="bg-white rounded-lg px-4 mt-4 py-4 text-center">
                        <Text className="text-[#40B885] text-center text-lg">Total Outbreak Predictions</Text>
                        <Text className="text-[#626262] text-center mt-2 font-bold text-2xl">576</Text>
                    </View>
                </View>

                <View className="px-4">
                    <BarChart
                        data={data}
                        width={340}
                        height={220}
                        yAxisLabel=""
                        chartConfig={{
                            backgroundColor: "#ffffff",
                            backgroundGradientFrom: "#ffffff",
                            backgroundGradientTo: "#ffffff",
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(64, 184, 133, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(98, 98, 98, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#40B885"
                            }
                        }}
                        yAxisSuffix=""
                    />
                </View>

                <View className="px-4 my-8">
                    <BarChart
                        data={data}
                        width={350}
                        height={220}
                        yAxisLabel=""
                        chartConfig={{
                            backgroundColor: "#ffffff",
                            backgroundGradientFrom: "#ffffff",
                            backgroundGradientTo: "#ffffff",
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(64, 184, 133, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(98, 98, 98, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#40B885"
                            }
                        }}
                        yAxisSuffix=""
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
export default HomeScreen;