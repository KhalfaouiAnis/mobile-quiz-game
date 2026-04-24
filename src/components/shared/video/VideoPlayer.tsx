import { Ionicons } from "@expo/vector-icons";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
import PlayerTrackProgress from "./PlayerProgressTrack";

const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export default function VideoPlayer({
    source,
    autoPlay,
    initialFullScreen = false,
    windowedWidth = 300,
    windowedHeight = 200,
}: {
    source?: string;
    autoPlay?: boolean;
    initialFullScreen?: boolean;
    windowedWidth?: number;
    windowedHeight?: number;
}) {
    const [status, setStatus] = useState<
        "idle" | "loading" | "readyToPlay" | "error"
    >("idle");
    const [isControlsVisible, setIsControlsVisible] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(initialFullScreen);

    // Guards to detect end-of-video reliably
    const hasPlayedRef = useRef(false);
    const endedRef = useRef(false);

    const videoPlayer = useVideoPlayer(
        {
            uri: source || "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        },
        (player) => {
            player.loop = false;
            autoPlay && player.play();
            player.timeUpdateEventInterval = 0.3
        },
    );

    const duration = videoPlayer.duration || 0;
    const position = videoPlayer.currentTime || 0;

    const { currentTime } = useEvent(videoPlayer, 'timeUpdate', {
        currentTime: videoPlayer.currentTime,
        bufferedPosition: videoPlayer.bufferedPosition,
        currentLiveTimestamp: videoPlayer.currentLiveTimestamp,
        currentOffsetFromLive: videoPlayer.currentOffsetFromLive
    });

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    const { isPlaying } = useEvent(videoPlayer, "playingChange", {
        isPlaying: videoPlayer.playing,
    });

    const { status: playerStatus } = useEvent(videoPlayer, "statusChange", {
        status: videoPlayer.status,
    });

    // Track that playback has started at least once
    useEffect(() => {
        if (isPlaying) {
            hasPlayedRef.current = true;
            endedRef.current = false;
        }
    }, [isPlaying]);

    // Detect end-of-video → pause + exit fullscreen
    useEffect(() => {
        if (
            hasPlayedRef.current &&
            !endedRef.current &&
            !isPlaying &&
            duration > 0 &&
            currentTime >= duration - 0.5
        ) {
            endedRef.current = true;
            videoPlayer.pause();
            setIsFullScreen(false);
        }
    }, [isPlaying, currentTime, duration]);

    useEffect(() => {
        setStatus(playerStatus);
    }, [isPlaying, playerStatus]);

    const togglePlayPause = () => {
        if (isPlaying) {
            videoPlayer.pause();
        } else {
            if (videoPlayer.currentTime >= duration) {
                videoPlayer.replay();
            }
            videoPlayer.play();
        }
        setTimeout(() => {
            if (isControlsVisible) {
                setIsControlsVisible(false);
            }
        }, 2000);
    };

    const handleSeek = (time: number) => {
        videoPlayer.currentTime = time;
    };

    const toggleFullScreen = () => setIsFullScreen((prev) => !prev);

    if (status === "error") {
        return (
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <View className="bg-white dark:bg-gray-800 p-4 rounded-lg w-4/5">
                    <Text className="text-error text-center">Error loading video</Text>
                </View>
            </View>
        );
    }

    const playerContent = (
        <Pressable
            style={{ direction: "rtl" }}
            className="bg-slate-900 overflow-hidden relative flex-1"
            onTouchStart={() => setIsControlsVisible(!isControlsVisible)}
        >
            <VideoView
                contentFit="cover"
                style={{ flex: 1 }}
                player={videoPlayer}
                nativeControls={false}
                fullscreenOptions={{ enable: false }}
            />
            <View className="absolute inset-0 flex justify-center items-center">
                {status === "loading" ? (
                    <ActivityIndicator size="large" color="#FFFFFF" />
                ) : (
                    <>
                        <Pressable
                            onPress={togglePlayPause}
                            className="p-4 bg-black/60 rounded-full shadow-lg"
                        >
                            <Ionicons
                                name={isPlaying ? "stop" : "play"}
                                color="gray"
                                size={24}
                            />
                        </Pressable>

                        <View className="absolute bottom-0 left-0 right-0 p-3 bg-slate-800 flex-row items-center">
                            <Pressable onPress={toggleFullScreen} className="ml-2 p-1">
                                <Ionicons
                                    name={isFullScreen ? "contract" : "expand"}
                                    color="white"
                                    size={18}
                                />
                            </Pressable>
                            <Text className="text-white text-xs me-2 w-20 text-end">
                                {formatTime(position)} / {formatTime(duration)}
                            </Text>
                            <PlayerTrackProgress
                                progress={progress}
                                duration={duration}
                                onSeek={handleSeek}
                            />
                        </View>
                    </>
                )}
            </View>
        </Pressable>
    );

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
                    {playerContent}
                </View>
            </Modal>
        );
    }

    return (
        <View style={{ width: windowedWidth, height: windowedHeight, borderRadius: 15, overflow: "hidden", direction: "rtl" }}>
            {playerContent}
        </View>
    );
}
