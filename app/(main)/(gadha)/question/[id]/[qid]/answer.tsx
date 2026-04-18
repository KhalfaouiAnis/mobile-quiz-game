import { Image } from 'expo-image';
import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator, ScrollView, Dimensions, unstable_batchedUpdates } from 'react-native';
import AppButton from '@/src/components/shared/button/AppButton';
import { useGadhaGameActions, useGadhaGameStore } from '@/src/stores/game.gadha.store';
import { type SessionBoard } from '@/src/types/game.gadha.types';
import { useAnswerQuestion } from '@/src/hooks/mutations/gameGadha/useAnswerQuestion';
import { useRevealAnswer } from '@/src/hooks/queries/gameGadha/useRevealAnswer';
import { toast } from 'sonner-native';
import { isAxiosError } from 'axios';
import { useShallow } from 'zustand/shallow';

export default function AnswerScreen() {
    const { qid, id } = useLocalSearchParams<{ id: string, qid: string }>();
    const { team1BoostActive, team2BoostActive, answeredQuestionsIds } = useGadhaGameStore(
        useShallow(state => ({
            team1BoostActive: state.team1BoostActive,
            team2BoostActive: state.team2BoostActive,
            answeredQuestionsIds: state.optimisticAnsweredIds,
        }))
    )
    const { markAnswered, deactivateBoosts, addScore } = useGadhaGameActions();
    const teams = useGadhaGameStore(useShallow(store => store.teams))

    const answerMutation = useAnswerQuestion(Number(id));
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useRevealAnswer(Number(id), Number(qid))

    const questionData = queryClient.getQueryData<SessionBoard>(["gadha", "board", Number(id)])
        ?.questions.find(q => q?.id === Number(qid));

    const handleSubmitAnswer = async ({ teamIndex, isCorrect, useBoost = false }: { teamIndex: number, isCorrect: boolean, useBoost: boolean }) => {
        answerMutation.mutate({
            teamId: teams[teamIndex].id!,
            questionId: Number(qid),
            isCorrect,
            useBoost
        },
            {
                onSuccess() {
                    if (questionData) {
                        unstable_batchedUpdates(() => {
                            if (isCorrect) {
                                addScore(teamIndex, questionData.points, useBoost);
                            }
                            if (useBoost) {
                                deactivateBoosts()
                            }
                            markAnswered(Number(qid));
                        })
                        router.replace(`/(main)/(gadha)/board/${id}`);
                    }
                },
                onError(error) {
                    if (isAxiosError(error)) {
                        toast.error(error.response?.data.message)
                    }
                }
            }
        )
    }

    return (
        <View className="flex-1 flex-row p-4 gap-4">
            {
                error ? (
                    <View className='flex-1 items-center justify-center'>
                        <Text className='text-error text-lg font-cairo-semibold text-center'>{error.message}</Text>
                    </View>
                ) : (
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
                                // disabled={answerMutation.isPending || answeredQuestionsIds.has(Number(qid))}
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
                )
            }
        </View>
    );
}