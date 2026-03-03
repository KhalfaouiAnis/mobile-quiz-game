import GameActions from '@/core/components/game1/teams/game-actions';
import Container from '@/core/components/ui/shared/container';
import { useGame1Actions, useGame1Store } from '@/core/store/game1.store';
import { GameBoard } from '@/core/types';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, useGlobalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function QuestionLayout() {
    const { questionId, sessionId } = useGlobalSearchParams<{ questionId: string, sessionId: string }>();
    const { activateBoost } = useGame1Actions()
    const team1BoostActive = useGame1Store(state => state.team1BoostActive)
    const team2BoostActive = useGame1Store(state => state.team2BoostActive)

    const queryClient = useQueryClient();
    const teams = useGame1Store(store => store.teams)

    const questionData = queryClient.getQueryData<GameBoard>(["game1__session", "game_board", Number(sessionId)])
        ?.grid.find(q => q?.id === Number(questionId));

    return (
        <Container backgroundColor="#00A6DA">
            <View className="flex-1 flex-row">
                <GameActions
                    isTeamA
                    team={teams[0]}
                    boostActive={team1BoostActive}
                    handleBoost={() => activateBoost(0)}
                />
                <View className='flex-1 mb-2 items-center ms-1'>
                    <View className='border border-error bg-white rounded-md px-6 py-2 mt-0.5'>
                        <Text className='text-error font-cairo-bold text-xl'>
                            {questionData?.subcategory?.name}
                        </Text>
                    </View>
                    <View className="flex-1 w-full bg-white mx-2 mt-1 rounded-xl">
                        <Stack
                            screenOptions={{
                                headerShown: false,
                                contentStyle: { backgroundColor: 'transparent' }
                            }} />
                    </View>
                </View>
                <GameActions
                    team={teams[1]}
                    boostActive={team2BoostActive}
                    handleBoost={() => activateBoost(1)}
                />
            </View>
        </Container>

    );
}