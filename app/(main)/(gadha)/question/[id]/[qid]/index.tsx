import { useState } from "react";
import { Image } from "expo-image";
import { useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import AppButton from "@/src/components/shared/button/AppButton";
import GameTimer from "@/src/components/gadha/GameTimer";
import { type SessionBoard } from "@/src/types/game.gadha.types";
import { IMAGES } from "@/src/constants/images";
import { useGadhaGameStore } from "@/src/stores/game.gadha.store";
import { scale, verticalScale } from "@/src/utils/dimensions";
import FlipImage from "@/src/components/shared/FlipImage";
import VideoPlayer from "@/src/components/shared/video/VideoPlayer";

import { SCREEN } from "@/src/utils/dimensions"

export default function QuestionScreen() {
    const { qid, id } = useLocalSearchParams<{ qid: string, id: string }>();
    const questionTimeLimit = useGadhaGameStore(store => store.questionTimeLimit)
    const [timer, setTimer] = useState(false)
    const queryClient = useQueryClient();
    const { width, height } = SCREEN

    const questionData = queryClient.getQueryData<SessionBoard>(["gadha", "board", Number(id)])
        ?.questions.find(q => q?.id === Number(qid));

    const handleShowAnswer = () => {
        setTimer(true);
        router.push(`/(main)/(gadha)/question/${id}/${qid}/answer`);
    }

    return (
        <View className="flex-1 flex-row items-center px-4 pt-4 gap-4">
            <GameTimer duration={questionTimeLimit || 45} externalPause={timer} onTimeUp={handleShowAnswer} />
            <ScrollView contentContainerClassName="items-center justify-between gap-3 self-start">
                <Text className="text-xl font-cairo-medium" numberOfLines={2} ellipsizeMode="tail">
                    {questionData?.content}
                </Text>
                <VideoPlayer
                    autoPlay
                    initialFullScreen
                    windowedWidth={scale(480)}
                    windowedHeight={verticalScale(230)}
                />
                {/* <FlipImage
                    contentFit="cover"
                    style={{ width: scale(480), height: verticalScale(230), borderRadius: 15 }}
                    source={questionData?.file_url ? { uri: questionData?.file_url } : IMAGES.Question}
                /> */}
                <View className="pb-2" style={{ width: scale(150) }}>
                    <AppButton
                        title="الإجابة"
                        rounded={false}
                        onPress={handleShowAnswer}
                    />
                </View>
            </ScrollView>
        </View>
    );
}