import Game1Board from "@/core/components/game1/game-board";
import GameActions from "@/core/components/game1/teams/game-actions";
import Container from "@/core/components/ui/shared/container";
import { SOUND_EFFECTS } from "@/core/constants/audio";
import { useGame1SessionQueries } from "@/core/services/game1/session/session.queries";
import { useGame1Actions, useGame1Store } from "@/core/store/game1.store";
import { useAudioPlayer } from "expo-audio";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function GameBoard() {
    const { sessionId } = useLocalSearchParams<{ sessionId: string }>()
    const { useGameBoard } = useGame1SessionQueries()
    const audioPlayer = useAudioPlayer(SOUND_EFFECTS.LevelUp);
    const { data, isLoading } = useGameBoard(Number(sessionId))
    const { initGame, activateBoost } = useGame1Actions()
    const teams = useGame1Store(state => state.teams)
    const team1BoostActive = useGame1Store(store => store.team1BoostActive)
    const team2BoostActive = useGame1Store(store => store.team2BoostActive)

    useEffect(() => {
        if (data?.teams) {
            audioPlayer.seekTo(0);
            audioPlayer.play()
            initGame(data.teams, data.questionTimeLimit || 15)
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
                            <Game1Board {...data} />
                            <GameActions team={teams?.[1]} handleBoost={() => activateBoost(1)} boostActive={team2BoostActive} />
                        </>
                    )
                }
            </View>
        </Container>
    );
}
