import { useEffect } from 'react';
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS, scheduleOnRN } from "react-native-worklets"
import Reanimated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const THUMB_SIZE = 16;

export default function PlayerTrackProgress({
    progress,
    duration,
    onSeek,
}: {
    progress: number, duration: number;
    onSeek: (time: number) => void;
}) {
    const progressSV = useSharedValue(progress / 100);
    const thumbScale = useSharedValue(0);
    const thumbOpacity = useSharedValue(0);
    const containerWidth = useSharedValue(1);
    const isDragging = useSharedValue(false);

    useEffect(() => {
        if (!isDragging.value) {
            progressSV.value = withTiming(progress / 100, { duration: 300 });
        }
    }, [progress]);

    const showThumb = () => {
        "worklet";
        thumbScale.value = withSpring(1, { damping: 12, stiffness: 200 });
        thumbOpacity.value = withSpring(1);
    };

    const hideThumb = () => {
        "worklet";
        thumbScale.value = withSpring(0, { damping: 12, stiffness: 200 });
        thumbOpacity.value = withSpring(0);
    };

    const panGesture = Gesture.Pan()
        .minDistance(0)
        .onBegin((e) => {
            isDragging.value = true;
            showThumb();
            progressSV.value = Math.min(Math.max(e.x / containerWidth.value, 0), 1);
        })
        .onUpdate((e) => {
            progressSV.value = Math.min(Math.max(e.x / containerWidth.value, 0), 1);
        })
        .onEnd(() => {
            isDragging.value = false;
            hideThumb();
            scheduleOnRN(onSeek, progressSV.value * duration);
        })
        .onFinalize(() => {
            // Safety net if gesture is cancelled (e.g. interrupted by scroll)
            if (isDragging.value) {
                isDragging.value = false;
                hideThumb();
                // runOnJS(onSeek)(progressSV.value * duration);
                scheduleOnRN(onSeek, progressSV.value * duration);
            }
        });

    const progressBarStyle = useAnimatedStyle(() => ({
        width: `${progressSV.value * 100}%`,
    }));

    const thumbStyle = useAnimatedStyle(() => ({
        opacity: thumbOpacity.value,
        transform: [
            { translateX: (1 - progressSV.value) * containerWidth.value - THUMB_SIZE / 2 },
            { scale: thumbScale.value },
        ],
    }));

    return (
        <GestureDetector gesture={panGesture}>
            <Reanimated.View
                style={{ flex: 1, height: 24, justifyContent: "center" }}
                onLayout={(e) => {
                    containerWidth.value = e.nativeEvent.layout.width;
                }}
            >
                <Reanimated.View
                    style={{ transform: [{ scaleX: 1 }] }}
                    className="h-2 bg-gray-200 rounded-full overflow-hidden"
                >
                    <Reanimated.View
                        className="h-full bg-primary-500 rounded-full"
                        style={progressBarStyle}
                    />
                </Reanimated.View>

                <Reanimated.View
                    style={[
                        {
                            position: "absolute",
                            width: THUMB_SIZE,
                            height: THUMB_SIZE,
                            borderRadius: THUMB_SIZE / 2,
                            backgroundColor: "white",
                            top: (24 - THUMB_SIZE) / 2,
                            left: 0,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.35,
                            shadowRadius: 3,
                            elevation: 4,
                        },
                        thumbStyle,
                    ]}
                />
            </Reanimated.View>
        </GestureDetector>
    )
}