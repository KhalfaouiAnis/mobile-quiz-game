import AppButton from "@/core/components/ui/base/button/app-button";
import GameTimer from "@/core/components/ui/shared/game-timer";
import { IMAGES } from "@/core/constants/images";
import { GameBoard } from "@/core/types";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";

export default function QuestionScreen() {
    const { questionId, sessionId } = useLocalSearchParams<{ questionId: string, sessionId: string }>();
    const [timer, setTimer] = useState(false)
    const queryClient = useQueryClient();

    const questionData = queryClient.getQueryData<GameBoard>(["game1__session", "game_board", Number(sessionId)])
        ?.grid.find(q => q?.id === Number(questionId));

    const handleShowAnswer = () => {
        setTimer(true);
        router.push(`/(main)/game1/${sessionId}/${questionId}/answer`);
    }

    return (
        <View className="flex-1 flex-row px-4 pt-4 gap-4">
            <View className="self-center">
                <GameTimer duration={15} externalPause={timer} onTimeUp={handleShowAnswer} />
            </View>
            <ScrollView contentContainerClassName="items-center justify-between gap-4">
                <Text className="text-xl text-center font-cairo-medium" numberOfLines={2} ellipsizeMode="tail">
                    {questionData?.content}
                </Text>
                <Image
                    contentFit="cover"
                    source={questionData?.file_url ? { uri: questionData?.file_url } : IMAGES.Question}
                    style={{ width: (Dimensions.get("window").width / 2) - 20, height: (Dimensions.get("window").height / 2), borderRadius: 15 }}
                />
                <View className="w-1/3 mb-2">
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