import AppButton from '@/core/components/ui/base/button/app-button';
import { useGame1SessionMutations } from '@/core/services/game1/session/session.mutations';
import { useCorrectAnswerQuery } from '@/core/services/game1/session/session.queries';
import { useGame1Actions } from '@/core/store/game1.store';
import { GameBoard } from '@/core/types';
import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';

export default function AnswerScreen() {
    const { questionId, sessionId } = useLocalSearchParams<{ sessionId: string, questionId: string }>();
    const { data, isLoading } = useCorrectAnswerQuery(Number(questionId))
    const { submitGame1Answer: { mutate, isPending } } = useGame1SessionMutations()
    const { addScore, markAnswered } = useGame1Actions();
    const queryClient = useQueryClient();

    const questionData = queryClient.getQueryData<GameBoard>(['game', sessionId])
        ?.grid.find(q => q.id === Number(questionId));

    const handleSubmitAnswer = async (team_id: number) => {
        mutate({
            is_boosted: false,
            session_id: Number(sessionId),
            is_correct: false,
            question_id: Number(questionId),
            team_id
        },
            {
                onSettled() {
                    router.back()
                }
            }
        )
        if (questionData) {
            addScore(team_id, questionData.points,false);
            markAnswered(Number(questionId));
        }
    }

    return (
        <View className="flex-1 flex-row p-4 gap-4">
            <View className="items-center flex-1 justify-evenly">
                <View className='gap-4'>
                    <Text className="text-lg text-center font-cairo-medium">الإجابة:</Text>
                    {
                        isLoading || !data?.data?.answer_id ? (
                            <ActivityIndicator size="large" color="#00A6DA" />
                        ) : (
                            <Text className="text-3xl text-center font-cairo-medium pb-2" numberOfLines={2} ellipsizeMode="tail">
                                {data?.data.answer_text} ✅
                            </Text>
                        )
                    }
                </View>
                <View className='flex-row items-center justify-around gap-6 px-8'>
                    <View className="w-1/3">
                        <AppButton
                            danger
                            semiRounded
                            rounded={false}
                            title="الفريق A"
                            loading={isPending}
                            onPress={() => handleSubmitAnswer(0)}
                        />
                    </View>
                    <View className="w-1/3">
                        <AppButton
                            title="لا أحد"
                            rounded={false}
                            onPress={() => handleSubmitAnswer(0)}
                        />
                    </View>
                    <View className="w-1/3">
                        <AppButton
                            title="الفريق B"
                            semiRounded
                            rounded={false}
                            danger
                            onPress={() => handleSubmitAnswer(1)}
                        />
                    </View>
                </View>
                <View className="w-1/3">
                    <AppButton
                        title="ارجع للسؤال"
                        rounded={false}
                        onPress={() => router.back()}
                    />
                </View>
            </View>
        </View>
    );
}