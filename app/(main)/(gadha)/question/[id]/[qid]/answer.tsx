import { Image } from 'expo-image';
import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import AppButton from '@/src/components/shared/button/AppButton';
import { useGadhaGameActions, useGadhaGameStore } from '@/src/stores/game.gadha.store';
import { type GameBoard } from '@/src/types/game.gadha.types';
import { useAnswerQuestion } from '@/src/hooks/mutations/gameGadha/useAnswerQuestion';
import { useRevealAnswer } from '@/src/hooks/queries/gameGadha/useRevealAnswer';

export default function AnswerScreen() {
    const { qid, id } = useLocalSearchParams<{ id: string, qid: string }>();
    const answeredQuestionsIds = useGadhaGameStore(store => store.optimisticAnsweredIds)
    const team1BoostActive = useGadhaGameStore(store => store.team1BoostActive)
    const team2BoostActive = useGadhaGameStore(store => store.team2BoostActive)
    const { addScore, markAnswered, deactivateBoosts } = useGadhaGameActions();
    const teams = useGadhaGameStore(store => store.teams)
    const answerMutation = useAnswerQuestion(Number(id));
    const queryClient = useQueryClient();

    const { data, isLoading } = useRevealAnswer(Number(id), Number(qid))

    const questionData = queryClient.getQueryData<GameBoard>(["gadha", "board", Number(id)])
        ?.grid.find(q => q?.id === Number(qid));

    const handleSubmitAnswer = async ({ teamIndex, isCorrect, useBoost = false }: { teamIndex: number, isCorrect: boolean, useBoost: boolean }) => {
        answerMutation.mutate({
            questionId: Number(qid),
            teamId: teams[teamIndex].id!,
            isCorrect,
            useBoost
        },
            {
                onSuccess() {
                    queryClient.invalidateQueries({ queryKey: ["gadha", "board", Number(id)] })
                    if (questionData) {
                        if (isCorrect) {
                            addScore(teamIndex, questionData.points, useBoost);
                        }
                        if (useBoost) {
                            deactivateBoosts()
                        }
                        markAnswered(Number(qid));
                    }
                    router.push(`/(main)/(gadha)/board/${id}`);
                }
            }
        )
    }

    return (
        <View className="flex-1 flex-row p-4 gap-4">
            <ScrollView contentContainerClassName="items-center justify-between gap-4">
                <View className='gap-4'>
                    <Text className="text-lg text-center font-cairo-medium">الإجابة:</Text>
                    {
                        isLoading ? (
                            <ActivityIndicator size="large" color="#00A6DA" />
                        ) : (
                            <View className='gap-3'>
                                <Text className="text-3xl text-center font-cairo-medium pb-2" numberOfLines={2} ellipsizeMode="tail">
                                    ✅ {data?.answer?.text}
                                </Text>
                                {data?.answer?.fileUrl && (
                                    <Image
                                        contentFit="cover"
                                        source={{ uri: data?.answer?.fileUrl }}
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
                            title={teams[0].name || ""}
                            onPress={() => handleSubmitAnswer({ teamIndex: 0, isCorrect: true, useBoost: team1BoostActive })}
                            disabled={answerMutation.isPending || answeredQuestionsIds.has(Number(qid))}
                        />
                    </View>
                    <View className="w-1/3">
                        <AppButton
                            title="لا أحد"
                            rounded={false}
                            onPress={() => handleSubmitAnswer({ teamIndex: 0, isCorrect: false, useBoost: team1BoostActive || team2BoostActive })}
                            disabled={answerMutation.isPending || answeredQuestionsIds.has(Number(qid))}
                        />
                    </View>
                    <View className="w-1/3">
                        <AppButton
                            danger
                            semiRounded
                            title={teams[1].name || ""}
                            onPress={() => handleSubmitAnswer({ teamIndex: 1, isCorrect: true, useBoost: team2BoostActive })}
                            disabled={answerMutation.isPending || answeredQuestionsIds.has(Number(qid))}
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