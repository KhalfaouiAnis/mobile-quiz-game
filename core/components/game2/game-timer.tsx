import { useGameTimer } from '@/core/hooks/use-game-timer';
import LinearGradient, { } from "react-native-linear-gradient"
import { View, Text } from 'react-native';

const Game2Timer = ({ duration = 30 }) => {
    const { seconds } = useGameTimer(duration, () => {
        console.log("Time is up!");
    });

    const textColor = seconds <= 5 ? 'text-red-500' : 'text-black';

    return (
        <View className="relative items-center p-2 rounded-full">
            <LinearGradient
                colors={['rgba(0,0,0,0.04)', 'rgba(0,0,0,0.02)']}
                style={{ borderRadius: 9999, position: "absolute", inset: 0 }}
            />
            <View className="absolute inset-0 rounded-full border border-white/50" />
            <View className={`w-24 h-24 rounded-full items-center justify-center bg-gray-50`}>
                <Text className={`text-3xl font-bagel-regular ${textColor}`}>
                    {seconds}
                </Text>
            </View>
        </View>
    );
};

export default Game2Timer