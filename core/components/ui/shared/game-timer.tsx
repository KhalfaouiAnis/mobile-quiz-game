import { VIEW_SCALE_FACTOR } from '@/core/constants';
import { useGameTimer } from '@/core/hooks/use-game-timer';
import LinearGradient, { } from "react-native-linear-gradient"
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Pressable } from 'react-native';

const GameTimer = ({ duration = 30 }) => {
    const { seconds, isActive, pause, start, restart } = useGameTimer(duration, () => {
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
            <Pressable
                hitSlop={10}
                onPress={isActive ? pause : start}
                className="rounded-full absolute -top-3"
            >
                <Ionicons name={isActive ? 'pause-circle' : "play-circle"} size={36 * VIEW_SCALE_FACTOR} color="#00A6DA" />
            </Pressable>

            <Pressable
                hitSlop={10}
                onPress={restart}
                className="rounded-full absolute -bottom-3"
            >
                <Ionicons style={{transform: "rotateX:-90"}} name="refresh-circle" size={36 * VIEW_SCALE_FACTOR} color="#00A6DA" />
            </Pressable>
        </View>
    );
};

export default GameTimer