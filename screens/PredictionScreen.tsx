import BackButton from "lassa-alert/components/BackButton";
import { SafeAreaView, Text, View } from "react-native";

const PredictionScreen = ({ route }) => {
    const { prediction } = route.params
    const { title, subtitle, outbreakPrediction } = prediction
    const { location, occurrenceMonth, occurrenceYear, severity, likelihood } = outbreakPrediction || {}
    const isHighSeverity = severity.includes('High')
    const isHighLikelihood = likelihood.includes('High')
    return (
        <SafeAreaView  className="bg-[#f1ecec] flex-1">
            <View className="px-4 my-4">
                <View className="">
                    <BackButton title="Predictions" />
                </View>
                <View className="flex gap-4 mt-2">
                    <Text className="font-bold text-lg">{title}</Text>

                    <View className="flex flex-row items-center">
                        <View>
                            <Text className="w-20">Location:</Text>
                        </View>
                        <Text className="font-bold text-lg">{outbreakPrediction?.location?.state}</Text>
                    </View>

                    <View className="flex flex-row items-center">
                        <View>
                            <Text className="w-20">Date:</Text>
                        </View>
                        <Text className="font-bold text-lg">{occurrenceMonth}, {occurrenceYear}</Text> 
                    </View>

                    <View className="flex flex-row items-center">
                        <View>
                            <Text className="w-20">Severity:</Text>
                        </View>
                        <Text className={`font-bold text-lg ${isHighSeverity ? 'text-red-600' : 'text-green-600'}`}>{severity}</Text>
                    </View>

                    <View className="flex flex-row items-center">
                        <View>
                            <Text className="w-20">Likelihood:</Text>
                        </View>
                        <Text className={`font-bold text-lg ${isHighLikelihood ? 'text-red-600' : 'text-green-600'}`}> {likelihood} </Text>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    )
}
export default PredictionScreen;