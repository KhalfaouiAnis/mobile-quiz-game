import { useQueryClient } from '@tanstack/react-query';
import { Stack, useGlobalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import GameActions from '@/src/components/gadha/teams/game-actions';
import Container from '@/src/components/shared/Container';
import { useGadhaGameActions, useGadhaGameStore } from '@/src/stores/game.gadha.store';
import { type SessionBoard } from '@/src/types/game.gadha.types';

export default function QuestionLayout() {
    const { qid, id } = useGlobalSearchParams<{ qid: string, id: string }>();
    const team1BoostActive = useGadhaGameStore(state => state.team1BoostActive)
    const team2BoostActive = useGadhaGameStore(state => state.team2BoostActive)
    const teams = useGadhaGameStore(store => store.teams)
    const { activateBoost } = useGadhaGameActions()
    const queryClient = useQueryClient();

    const questionData = queryClient.getQueryData<SessionBoard>(["gadha", "board", Number(id)])
        ?.questions.find(q => q?.id === Number(qid));

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