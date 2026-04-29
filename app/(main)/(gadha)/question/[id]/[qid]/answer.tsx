import { useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, ActivityIndicator, ScrollView, unstable_batchedUpdates } from 'react-native';
import AppButton from '@/src/components/shared/button/AppButton';
import { useGadhaGameActions, useGadhaGameStore } from '@/src/stores/game.gadha.store';
import { type SessionBoard } from '@/src/types/game.gadha.types';
import { useAnswerQuestion } from '@/src/hooks/mutations/gameGadha/useAnswerQuestion';
import { useRevealAnswer } from '@/src/hooks/queries/gameGadha/useRevealAnswer';
import { toast } from 'sonner-native';
import { isAxiosError } from 'axios';
import { useShallow } from 'zustand/shallow';
import { scale, verticalScale } from '@/src/utils/dimensions';
import FlipImage from '@/src/components/shared/FlipImage';
import VideoPlayer from '@/src/components/shared/video/VideoPlayer';

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
                    if (result.isSessionComplete) {
                        router.replace(`/(gadha)/results/${id}`);
                        return;
                    }
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

    if (error) return (
        <View className='flex-1 items-center justify-center'>
            <Text className='text-error text-lg font-cairo-semibold text-center'>{error.message}</Text>
        </View>
    )

    if (isLoading) return (
        <View className='flex-1 items-center justify-center'>
            <ActivityIndicator size="large" color="#00A6DA" />
        </View>
    )

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="items-center justify-between gap-3 py-2">
            <View className='gap-1 items-center'>
                <Text className="text-xl text-center font-cairo-medium pb-2" numberOfLines={2} ellipsizeMode="tail">
                    ✅ {data?.answer?.text}
                </Text>
                {
                    data?.answer?.mediaType === "video" ? <VideoPlayer
                        windowedHeight={verticalScale(230)}
                        source={data.answer.fileUrl}
                        windowedWidth={scale(480)}
                        autoPlay={true}
                    /> : <FlipImage
                        contentFit="fill"
                        style={{ width: scale(440), height: verticalScale(190), borderRadius: 15 }}
                        source={data?.answer?.fileUrl ? { uri: data?.answer?.fileUrl } : undefined}
                    />
                }
            </View>
            <View className='flex-row items-center justify-around gap-6'>
                <View style={{ width: scale(170) }}>
                    <AppButton
                        danger
                        semiRounded
                        title={teams[0].name || ""}
                        disabled={answerMutation.isPending || answeredQuestionsIds.has(Number(qid))}
                        onPress={() => handleSubmitAnswer({ teamIndex: 0, isCorrect: true, useBoost: team1BoostActive })}
                    />
                </View>
                <View style={{ width: scale(170) }}>
                    <AppButton
                        title="لا أحد"
                        rounded={false}
                        disabled={answerMutation.isPending || answeredQuestionsIds.has(Number(qid))}
                        onPress={() => handleSubmitAnswer({ noOne: true, isCorrect: false, useBoost: team1BoostActive || team2BoostActive })}
                    />
                </View>
                <View style={{ width: scale(170) }}>
                    <AppButton
                        danger
                        semiRounded
                        title={teams[1].name || ""}
                        disabled={answerMutation.isPending || answeredQuestionsIds.has(Number(qid))}
                        onPress={() => handleSubmitAnswer({ teamIndex: 1, isCorrect: true, useBoost: team2BoostActive })}
                    />
                </View>
            </View>
            <View style={{ width: scale(170) }}>
                <AppButton
                    rounded={false}
                    title="ارجع للسؤال"
                    onPress={() => router.back()}
                />
            </View>
        </ScrollView>
    );
}