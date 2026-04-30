import { useGadhaGameTimer } from '@/src/hooks/useGameTimer';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { boxShadow, mergeBoxShadows } from '@/src/utils/cn';
import { scale } from '@/src/utils/dimensions';

interface Props {
    duration: number,
    onTimeUp?: () => void,
    externalPause?: boolean
}

const sclaedSize = scale(140)

const GameTimer = ({ duration = 15, onTimeUp, externalPause }: Props) => {
    const { seconds, isActive, pause, start, restart } = useGadhaGameTimer({ duration, externalPause, onTimeUp });

    const textColor = seconds <= 5 ? 'text-red-500' : 'text-black';

    const ballStyle = {
        width: sclaedSize,
        height: sclaedSize * 1.1,
        borderRadius: 99,
        ...mergeBoxShadows(
            boxShadow(0, -10, 10, 0, 'rgba(217,217,217,1)', true),
            boxShadow(0, 10, 10, 0, 'rgba(255,255,255,1)', true),
        ),
    };

    return (
        <View
            style={ballStyle}
            className="relative items-center p-2 rounded-full justify-center"
        >
            <View className={`w-24 h-24 rounded-full items-center justify-center`}>
                <Text className={`text-3xl font-bagel-regular ${textColor}`}>
                    {seconds}
                </Text>
            </View>
            <Pressable
                hitSlop={10}
                onPress={isActive ? pause : start}
                className="rounded-full absolute -top-4"
                disabled={(duration - seconds) === duration}
            >
                <Ionicons name={isActive ? 'pause-circle' : "play-circle"} size={scale(50)} color={(duration - seconds) === duration ? "#e5e7eb" : "#00A6DA"} />
            </Pressable>

            <Pressable
                hitSlop={10}
                onPress={restart}
                className="rounded-full absolute -bottom-4"
                style={{ transform: "rotateX:-90" }}
            >
                <Ionicons name="refresh-circle" size={scale(50)} color="#00A6DA" />
            </Pressable>
        </View>
    );
};

export default GameTimer
