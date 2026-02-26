import LinearGradient from "react-native-linear-gradient"
import { View, Text } from 'react-native';

const QuestionIndex = ({ index = 100, total = 100 }) => {

    return (
        <View className="relative items-center p-2 rounded-full">
            <LinearGradient
                colors={['rgba(0,0,0,0.04)', 'rgba(0,0,0,0.02)']}
                style={{ borderRadius: 9999, position: "absolute", inset: 0 }}
            />
            <View className="absolute inset-0 rounded-full border border-white/50" />
            <View className={`w-24 h-24 rounded-full items-center justify-center bg-gray-50`}>
                <Text className="text-2xl font-bagel-regular">
                    {total}\{index}
                </Text>
            </View>
        </View>
    );
};

export default QuestionIndex