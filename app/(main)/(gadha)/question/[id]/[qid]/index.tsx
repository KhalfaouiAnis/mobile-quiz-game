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

export default function QuestionScreen() {
    const { qid, id } = useLocalSearchParams<{ qid: string, id: string }>();
    const questionTimeLimit = useGadhaGameStore(store => store.questionTimeLimit)
    const [timer, setTimer] = useState(false)
    const queryClient = useQueryClient();

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
                <FlipImage
                    contentFit="cover"
                    style={{ width: scale(480), height: verticalScale(230), borderRadius: 15 }}
                    source={questionData?.file_url ? { uri: questionData?.file_url } : IMAGES.Question}
                />
                {/* <Image
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
        // <View className="flex-1  px-4 pt-4 ">
        //     <ScrollView contentContainerClassName="items-center justify-between gap-4 self-start me-4">
        //         <Text
        //             className="text-xl text-center font-cairo-medium"
        //             style={{ paddingHorizontal: fontScale(80) }}
        //             numberOfLines={2} ellipsizeMode="tail">
        //             {questionData?.content}
        //         </Text>
        //         <View className="flex-row items-center gap-8">
        //             <GameTimer duration={questionTimeLimit || 45} externalPause={timer} onTimeUp={handleShowAnswer} />
        //             <Image
        //                 contentFit="cover"
        //                 source={questionData?.file_url ? { uri: questionData?.file_url } : IMAGES.Question}
        //                 style={{ width: scale(400), height: verticalScale(220), borderRadius: 15 }}
        //             />
        //         </View>
        //         <View className="pb-2" style={{ width: scale(150) }}>
        //             <AppButton
        //                 title="الإجابة"
        //                 rounded={false}
        //                 onPress={handleShowAnswer}
        //             />
        //         </View>
        //     </ScrollView>
        // </View>
    );
}