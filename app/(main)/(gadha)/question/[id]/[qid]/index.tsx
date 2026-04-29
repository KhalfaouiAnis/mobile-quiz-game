import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import AppButton from "@/src/components/shared/button/AppButton";
import GameTimer from "@/src/components/gadha/GameTimer";
import { type SessionBoard } from "@/src/types/game.gadha.types";
import { useGadhaGameStore } from "@/src/stores/game.gadha.store";
import { scale, verticalScale } from "@/src/utils/dimensions";
import FlipImage from "@/src/components/shared/FlipImage";
import VideoPlayer from "@/src/components/shared/video/VideoPlayer";

export default function QuestionScreen() {
    const { qid, id } = useLocalSearchParams<{ qid: string, id: string }>();
    const questionTimeLimit = useGadhaGameStore(store => store.questionTimeLimit)
    const [externallyPaused, setExternallyPaused] = useState(false)
    const queryClient = useQueryClient();

    const questionData = queryClient.getQueryData<SessionBoard>(["gadha", "board", Number(id)])
        ?.questions.find(q => q?.id === Number(qid));

    const handleShowAnswer = () => {
        setExternallyPaused(true);
        router.push(`/(main)/(gadha)/question/${id}/${qid}/answer`);
    }

    return (
        <View className="flex-1 flex-row items-center px-4 pt-1 gap-4">
            <GameTimer duration={questionTimeLimit || 45} externalPause={externallyPaused} onTimeUp={handleShowAnswer} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="items-center justify-between gap-3 self-start">
                <Text className="text-xl font-cairo-medium" numberOfLines={2} ellipsizeMode="tail">
                    {questionData?.content}
                </Text>
                {
                    questionData?.media_type === "video" ? <VideoPlayer
                        initialFullScreen={questionData.init_fullscreen}
                        windowedHeight={verticalScale(230)}
                        source={questionData.file_url}
                        windowedWidth={scale(480)}
                        autoPlay={true}
                    /> : <FlipImage
                        contentFit="fill"
                        style={{ width: scale(480), height: verticalScale(240), borderRadius: 15 }}
                        source={questionData?.file_url ? { uri: questionData?.file_url } : undefined}
                    />
                }
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