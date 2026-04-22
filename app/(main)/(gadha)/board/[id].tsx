import { useEffect } from 'react';
import { useShallow } from "zustand/shallow"
import { useLocalSearchParams } from 'expo-router';
import { View, ActivityIndicator, } from 'react-native';
import Container from '@/src/components/shared/Container';
import GadhaGameBoard from '@/src/components/gadha/GameBoard';
import GameActions from '@/src/components/gadha/teams/GameActions';
import { useGadhaGameBoard } from '@/src/hooks/queries/gameGadha/useGadhaBoard';
import { useGadhaGameActions, useGadhaGameStore } from '@/src/stores/game.gadha.store';

export default function GameBoard() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { data, isLoading } = useGadhaGameBoard(Number(id))
    const { initGame, activateBoost } = useGadhaGameActions()
    const teams = useGadhaGameStore(useShallow(state => state.teams))
    const { team1BoostActive, team2BoostActive } = useGadhaGameStore(
        useShallow(state => ({
            team1BoostActive: state.team1BoostActive,
            team2BoostActive: state.team2BoostActive,
        }))
    )

    useEffect(() => {
        if (data?.teams && !teams?.[0]) {
            initGame(data.teams, data.session.questionTimeLimit || 25)
        }
    }, [data])

    return (
        <Container backgroundColor="#FFF">
            <View className="flex-1 flex-row items-center justify-center">
                {
                    (isLoading || !data) ? (
                        <ActivityIndicator size="large" color="#00A6DA" />
                    ) : (
                        <>
                            <GameActions isTeamA team={teams?.[0]} handleBoost={() => activateBoost(0)} boostActive={team1BoostActive} />
                            <GadhaGameBoard sessionId={data.session.id} columnHeaders={data.columnHeaders} questions={data.questions} />
                            <GameActions team={teams?.[1]} handleBoost={() => activateBoost(1)} boostActive={team2BoostActive} />
                        </>
                    )
                }
            </View>
        </Container>
    );
}