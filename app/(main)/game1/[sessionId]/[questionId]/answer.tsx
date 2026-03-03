import AppButton from '@/core/components/ui/base/button/app-button';
import { useGame1SessionMutations } from '@/core/services/game1/session/session.mutations';
import { useGame1SessionQueries } from '@/core/services/game1/session/session.queries';
import { useGame1Actions, useGame1Store } from '@/core/store/game1.store';
import { GameBoard } from '@/core/types';
import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator, ScrollView, Dimensions } from 'react-native';

export default function AnswerScreen() {
    const { questionId, sessionId } = useLocalSearchParams<{ sessionId: string, questionId: string }>();
    const { submitGame1Answer: { mutate, isPending } } = useGame1SessionMutations()
    const { addScore, markAnswered } = useGame1Actions();
    const team1BoostActive = useGame1Store(store => store.team1BoostActive)
    const team2BoostActive = useGame1Store(store => store.team2BoostActive)
    const answeredQuestionsIds = useGame1Store(store => store.optimisticAnsweredIds)
    const queryClient = useQueryClient();
    const { teams } = useGame1Store()

    const { useCorerctAnswer } = useGame1SessionQueries();
    const { data, isLoading } = useCorerctAnswer(Number(questionId))

    const questionData = queryClient.getQueryData<GameBoard>(["game1__session", "game_board", Number(sessionId)])
        ?.grid.find(q => q?.id === Number(questionId));

    const handleSubmitAnswer = async (teamIndex: number, is_correct: boolean, is_boosted: boolean = false) => {
        mutate({
            question_id: Number(questionId),
            session_id: Number(sessionId),
            team_id: teams[teamIndex].id!,
            is_boosted,
            is_correct,
        })
        if (questionData) {
            addScore(teamIndex, questionData.points, is_boosted);
            markAnswered(Number(questionId));
        }
    }

    return (
        <View className="flex-1 flex-row p-4 gap-4">
            <ScrollView contentContainerClassName="items-center justify-between gap-4">
                <View className='gap-4'>
                    <Text className="text-lg text-center font-cairo-medium">الإجابة:</Text>
                    {
                        isLoading || !data?.data?.answer_text ? (
                            <ActivityIndicator size="large" color="#00A6DA" />
                        ) : (
                            <View className='gap-3'>
                                <Text className="text-3xl text-center font-cairo-medium pb-2" numberOfLines={2} ellipsizeMode="tail">
                                    ✅ {data?.data.answer_text}
                                </Text>
                                {data.data.file_url && (
                                    <Image
                                        contentFit="cover"
                                        source={{ uri: data.data.file_url }}
                                        style={{ width: (Dimensions.get("window").width / 2) - 20, height: (Dimensions.get("window").height / 2), borderRadius: 15 }}
                                    />
                                )}
                            </View>
                        )
                    }
                </View>
                <View className='flex-row items-center justify-around gap-6 px-8'>
                    <View className="w-1/3">
                        <AppButton
                            danger
                            semiRounded
                            rounded={false}
                            loading={isPending}
                            title={teams[0].name || ""}
                            onPress={() => handleSubmitAnswer(0, true, team1BoostActive)}
                            disabled={isPending || answeredQuestionsIds.has(Number(questionId))}
                        />
                    </View>
                    <View className="w-1/3">
                        <AppButton
                            title="لا أحد"
                            rounded={false}
                            onPress={() => handleSubmitAnswer(1, false, false)}
                            disabled={isPending || answeredQuestionsIds.has(Number(questionId))}
                        />
                    </View>
                    <View className="w-1/3">
                        <AppButton
                            danger
                            semiRounded
                            rounded={false}
                            title={teams[1].name || ""}
                            onPress={() => handleSubmitAnswer(1, true, team2BoostActive)}
                            disabled={isPending || answeredQuestionsIds.has(Number(questionId))}
                        />
                    </View>
                </View>
                <View className="w-1/3">
                    <AppButton
                        rounded={false}
                        title="ارجع للسؤال"
                        onPress={() => router.back()}
                    />
                </View>
            </ScrollView>
        </View>
    );
}