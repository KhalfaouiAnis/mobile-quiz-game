import { useQueryClient } from '@tanstack/react-query';
import { Stack, useGlobalSearchParams, usePathname } from 'expo-router';
import { Text, View } from 'react-native';
import GameActions from '@/src/components/gadha/teams/game-actions';
import Container from '@/src/components/shared/Container';
import { useGadhaGameActions, useGadhaGameStore } from '@/src/stores/game.gadha.store';
import { type SessionBoard } from '@/src/types/game.gadha.types';
import { useShallow } from 'zustand/shallow';
import { fontScale, scale } from '@/src/utils/dimensions';
import ShadowedText from '@/src/components/shared/text/ShadowedText';
import ReportQuestion from '@/src/components/gadha/buttons/ReportQuestion';

export default function QuestionLayout() {
    const { qid, id } = useGlobalSearchParams<{ qid: string, id: string }>();
    const { teams, currentTeamId, team1BoostActive, team2BoostActive } = useGadhaGameStore(
        useShallow(state => ({
            teams: state.teams,
            currentTeamId: state.currentTeamId,
            team1BoostActive: state.team1BoostActive,
            team2BoostActive: state.team2BoostActive,
        }))
    )
    const { activateBoost } = useGadhaGameActions()
    const queryClient = useQueryClient();
    const pathname = usePathname()

    const questionData = queryClient.getQueryData<SessionBoard>(["gadha", "board", Number(id)])
        ?.questions.find(q => q?.id === Number(qid));

    const currentTeam = teams[0].id === currentTeamId ? teams[0] : teams[1]

    return (
        <Container backgroundColor="#00A6DA">
            <View className="flex-1 flex-row">
                <GameActions
                    isTeamA
                    team={teams[0]}
                    boostActive={team1BoostActive}
                    handleBoost={() => activateBoost(0)}
                />
                <View className='flex-1 mb-2 items-center me-1'>
                    <View className='relative w-full justify-center'>
                        {!pathname.includes("answer") && (
                            <Text
                                style={{ fontSize: fontScale(30) }}
                                className='text-white font-bagel-regular absolute top-2 start-1 z-10'>
                                {currentTeam.name || ""}
                            </Text>
                        )}

                        <Text className='text-error bg-white px-4 py-1.5 font-cairo-bold text-xl absolute border border-error rounded-md' style={{ end: "40%", top: 2 }}>
                            {questionData?.subcategory?.name}
                        </Text>

                        {!pathname.includes("answer") && (
                            <View
                                className='text-white font-bagel-regular absolute top-2 end-1 z-10'>
                                <ShadowedText fontSize={30} content={questionData?.points ? questionData?.points + "" : ""} fillColor={"#fff"} />
                            </View>
                        )}

                        {pathname.includes("answer") && <View className='absolute end-14  items-center'><ReportQuestion /></View>}
                    </View>
                    <View
                        style={{ marginTop: scale(60) }}
                        className="flex-1 w-full bg-white mx-2 rounded-xl">
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