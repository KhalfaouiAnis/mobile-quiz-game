import { Image } from 'expo-image';
import { useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, ActivityIndicator, ScrollView, Dimensions, unstable_batchedUpdates } from 'react-native';
import AppButton from '@/src/components/shared/button/AppButton';
import { useGadhaGameActions, useGadhaGameStore } from '@/src/stores/game.gadha.store';
import { type SessionBoard } from '@/src/types/game.gadha.types';
import { useAnswerQuestion } from '@/src/hooks/mutations/gameGadha/useAnswerQuestion';
import { useRevealAnswer } from '@/src/hooks/queries/gameGadha/useRevealAnswer';
import { toast } from 'sonner-native';
import { isAxiosError } from 'axios';
import { useShallow } from 'zustand/shallow';
import { scale, verticalScale } from '@/src/utils/dimensions';

export default function AnswerScreen() {
    const { qid, id } = useLocalSearchParams<{ id: string, qid: string }>();
    const { teams, team1BoostActive, team2BoostActive, answeredQuestionsIds } = useGadhaGameStore(
        useShallow(state => ({
            teams: state.teams,
            team1BoostActive: state.team1BoostActive,
            team2BoostActive: state.team2BoostActive,
            answeredQuestionsIds: state.optimisticAnsweredIds,
        }))
    )
    const { markAnswered, deactivateBoosts, addScore, switchTurn } = useGadhaGameActions();

    const answerMutation = useAnswerQuestion(Number(id));
    const queryClient = useQueryClient();
    const router = useRouter()

    const { data, isLoading, error } = useRevealAnswer(Number(id), Number(qid))

    const questionData = queryClient.getQueryData<SessionBoard>(["gadha", "board", Number(id)])
        ?.questions.find(q => q?.id === Number(qid));

    const handleSubmitAnswer = async ({ teamIndex, isCorrect, noOne, useBoost = false }: { teamIndex?: number, noOne?: boolean, isCorrect: boolean, useBoost: boolean }) => {
        const teamId = (teamIndex === 0 || teamIndex === 1) ? teams[teamIndex].id! : undefined;
        answerMutation.mutate({
            questionId: Number(qid),
            isCorrect,
            useBoost,
            teamId,
            noOne,
        },
            {
                onSuccess(result) {
                    if (questionData) {
                        router.replace(`/(main)/(gadha)/board/${id}`);

                        unstable_batchedUpdates(() => {
                            if ((teamIndex === 0 || teamIndex === 1) && isCorrect) {
                                addScore(teamIndex, questionData.points, useBoost);
                            }
                            if (useBoost) {
                                deactivateBoosts()
                            }
                            markAnswered(Number(qid));
                            switchTurn(result.nextTeamId);
                        })
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
        <View className="flex-1 flex-row  pb-0 gap-4">
            {
                error ? (
                    <View className='flex-1 items-center justify-center'>
                        <Text className='text-error text-lg font-cairo-semibold text-center'>{error.message}</Text>
                    </View>
                ) : (
                    <ScrollView contentContainerClassName="items-center justify-between gap-3 p-4">
                        <View className='gap-4'>
                            {
                                isLoading ? (
                                    <ActivityIndicator size="large" color="#00A6DA" />
                                ) : (
                                    <View className='gap-3'>
                                        <Text className="text-3xl text-center font-cairo-medium pb-2" numberOfLines={2} ellipsizeMode="tail">
                                            {data?.answer?.text} ✅
                                        </Text>
                                        {data?.answer?.fileUrl && (
                                            <Image
                                                contentFit="cover"
                                                source={{ uri: data?.answer?.fileUrl }}
                                                style={{ width: scale(440), height: verticalScale(210), borderRadius: 15 }}
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
                                    disabled={answerMutation.isPending || answeredQuestionsIds.has(Number(qid))}
                                    onPress={() => handleSubmitAnswer({ teamIndex: 0, isCorrect: true, useBoost: team1BoostActive })}
                                />
                            </View>
                            <View className="w-1/3">
                                <AppButton
                                    title="لا أحد"
                                    rounded={false}
                                    disabled={answerMutation.isPending || answeredQuestionsIds.has(Number(qid))}
                                    onPress={() => handleSubmitAnswer({ noOne: true, isCorrect: false, useBoost: team1BoostActive || team2BoostActive })}
                                />
                            </View>
                            <View className="w-1/3">
                                <AppButton
                                    danger
                                    semiRounded
                                    title={teams[1].name || ""}
                                    disabled={answerMutation.isPending || answeredQuestionsIds.has(Number(qid))}
                                    onPress={() => handleSubmitAnswer({ teamIndex: 1, isCorrect: true, useBoost: team2BoostActive })}
                                />
                            </View>
                        </View>
                        <View className="w-1/3 pb-2">
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