import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const Switch = ({ value, onValueChange }: { value: boolean, onValueChange?: (newValue: boolean) => void }) => {
    const translateX = useSharedValue(value ? 20 : 0);

    useEffect(() => {
        translateX.value = withSpring(value ? 20 : 0, { mass: 0.5, damping: 12 });
    }, [value, translateX]);

    const toggleSwitch = () => {
        const newValue = !value;
        onValueChange?.(newValue);
    };

    const animatedTrackStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                translateX.value,
                [0, 20],
                ['#e5e7eb', '#00A6DA']
            ),
        };
    });

    const animatedKnobStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    return (
        <TouchableOpacity
            onPress={toggleSwitch}
            activeOpacity={0.8}
        >
            <Animated.View
                style={[animatedTrackStyle]}
                className="w-12 h-6 rounded-full items-end justify-center p-1"
            >
                <Animated.View
                    style={[animatedKnobStyle]}
                    className="w-5 h-5 bg-white rounded-full shadow-md"
                />
            </Animated.View>
        </TouchableOpacity>
    );
};

export default Switch