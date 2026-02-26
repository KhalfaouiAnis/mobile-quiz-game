import AppButton from "@/core/components/ui/base/button/app-button";
import GameTimer from "@/core/components/ui/shared/game-timer";
import { IMAGES } from "@/core/constants/images";
import { useGameStore } from "@/core/store/game1.store";
import { GameBoard } from "@/core/types";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions, Text, View } from "react-native";

export default function QuestionScreen() {
    const { questionId, sessionId } = useLocalSearchParams<{ questionId: string, sessionId: string }>();
    const queryClient = useQueryClient();

    const questionData = queryClient.getQueryData<GameBoard>(['game', sessionId])
        ?.grid.find(q => q.id === Number(questionId));

    if (!questionData) return <Text>Error: Data missing</Text>;

    return (
        <View className="flex-1 flex-row px-4 pt-4 gap-4">
            <View className="self-center">
                <GameTimer duration={20} />
            </View>
            <View className="items-center flex-1 justify-between">
                <Text className="text-xl text-center font-cairo-medium" numberOfLines={2} ellipsizeMode="tail">
                    {questionData.content}
                </Text>
                <Image
                    contentFit="cover"
                    source={questionData.file_url ? { uri: questionData.file_url } : IMAGES.Question}
                    style={{ width: (Dimensions.get("window").width / 2) - 20, height: (Dimensions.get("window").height / 2), borderRadius: 15 }}
                />
                <View className="w-1/3 mb-2">
                    <AppButton
                        title="الإجابة"
                        rounded={false}
                        onPress={() => router.push(`/game1/${sessionId}/${questionId}/answer`)}
                    />
                </View>
            </View>
        </View>
    );
}