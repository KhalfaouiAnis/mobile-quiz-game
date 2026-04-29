import { ActivityIndicator, Modal, Pressable, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Image } from 'expo-image';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    withRepeat,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function FlipImage({ source, style, ...props }: any) {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);

    const loaderOpacity = useSharedValue(1);
    const rotateY = useSharedValue(-90);
    const opacity = useSharedValue(0);
    const shimmerX = useSharedValue(0);

    useEffect(() => {
        if (containerWidth <= 0) return;
        shimmerX.value = -containerWidth;
        shimmerX.value = withRepeat(
            withTiming(containerWidth, {
                duration: 1200,
                easing: Easing.linear,
            }),
            -1,
            false
        );
    }, [containerWidth]);

    const handleLoad = useCallback(() => {
        opacity.value = withTiming(1, { duration: 500 });
        rotateY.value = withTiming(0, {
            duration: 500,
            easing: Easing.out(Easing.cubic),
        });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ rotateY: `${rotateY.value}deg` }],
    }));

    // const loaderStyle = useAnimatedStyle(() => ({
    //     opacity: loaderOpacity.value,
    // }));

    const skeletonContainerStyle = useAnimatedStyle(() => ({
        opacity: loaderOpacity.value,
    }));

    const shimmerStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: shimmerX.value }],
    }));

    const toggleFullScreen = () => setIsFullScreen((prev) => !prev);

    const ImageContent = (
        <Pressable hitSlop={6} onPress={toggleFullScreen}>
            <Animated.View
                style={[StyleSheet.absoluteFill, styles.skeletonBase]}
                onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
            >
                <Animated.View style={[styles.shimmerStripe, shimmerStyle]} />
            </Animated.View>
            <AnimatedImage
                source={source}
                onLoad={handleLoad}
                style={[isFullScreen ? { width: "100%", height: "100%" } : style, animatedStyle]}
                {...props}
            />
        </Pressable>
    )

    if (isFullScreen) {
        return (
            <Modal
                visible
                animationType="fade"
                statusBarTranslucent
                navigationBarTranslucent
                style={{ direction: "rtl" }}
            >
                <View style={{ flex: 1, backgroundColor: "#0f172a" }}>
                    {ImageContent}
                </View>
            </Modal>
        );
    }

    return ImageContent
}

const styles = StyleSheet.create({
    skeletonBase: {
        backgroundColor: "#E0E0E0",
        overflow: "hidden",
        borderRadius: 15,
    },
    shimmerStripe: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "45%",
        // borderRadius: 15,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        transform: [{ skewX: "-20deg" }],
    },
});