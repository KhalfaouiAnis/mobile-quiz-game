import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, ActivityIndicator, } from 'react-native';
import Container from '@/src/components/shared/Container';
import GadhaGameBoard from '@/src/components/gadha/GameBoard';
import GameActions from '@/src/components/gadha/teams/game-actions';
import { useGadhaGameBoard } from '@/src/hooks/queries/gameGadha/useGadhaBoard';
import { useGadhaGameActions, useGadhaGameStore } from '@/src/stores/game.gadha.store';

export default function GameBoard() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { data, isLoading } = useGadhaGameBoard(Number(id))
    const { initGame, activateBoost } = useGadhaGameActions()
    const teams = useGadhaGameStore(state => state.teams)
    const team1BoostActive = useGadhaGameStore(store => store.team1BoostActive)
    const team2BoostActive = useGadhaGameStore(store => store.team2BoostActive)

    useEffect(() => {
        if (data?.teams) {
            initGame(data.teams, data.questionTimeLimit || 25)
        }
    }, [data?.teams])

    return (
        <Container backgroundColor="#FFF">
            <View className="flex-1 flex-row items-center justify-center">
                {
                    (isLoading || !data) ? (
                        <ActivityIndicator size={"large"} color={"#00A6DA"} />
                    ) : (
                        <>
                            <GameActions isTeamA team={teams?.[0]} handleBoost={() => activateBoost(0)} boostActive={team1BoostActive} />
                            <GadhaGameBoard {...data} />
                            <GameActions team={teams?.[1]} handleBoost={() => activateBoost(1)} boostActive={team2BoostActive} />
                        </>
                    )
                }
            </View>
        </Container>
    );
}