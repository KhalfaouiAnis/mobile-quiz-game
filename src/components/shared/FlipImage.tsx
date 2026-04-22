import React, { useCallback } from 'react';
import { Image } from 'expo-image';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    interpolate,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function FlipImage({ source, style, ...props }: any) {
    const rotateY = useSharedValue(-90);
    const opacity = useSharedValue(0);

    const handleLoad = useCallback(() => {
        opacity.value = withTiming(1, { duration: 1000 });
        rotateY.value = withTiming(0, {
            duration: 1000,
            easing: Easing.out(Easing.cubic),
        });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        const rotate = interpolate(rotateY.value, [0, 90], [0, 90]);
        return {
            opacity: opacity.value,
            transform: [
                { perspective: 800 },
                { rotateY: `${rotate}deg` },
            ],
        };
    });

    return (
        <AnimatedImage
            source={source}
            onLoad={handleLoad}
            style={[style, animatedStyle]}
            {...props}
        />
    );
}