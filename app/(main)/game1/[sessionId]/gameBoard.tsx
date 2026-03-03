import Game1Board from "@/core/components/game1/game-board";
import GameActions from "@/core/components/game1/teams/game-actions";
import Container from "@/core/components/ui/shared/container";
import { useGame1SessionQueries } from "@/core/services/game1/session/session.queries";
import { useGame1Actions } from "@/core/store/game1.store";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function GameBoard() {
    const { sessionId } = useLocalSearchParams<{ sessionId: string }>()
    const { useGameBoard } = useGame1SessionQueries()
    const { data, isLoading } = useGameBoard(Number(sessionId))
    const { initGame, activateBoost } = useGame1Actions()

    useEffect(() => {
        if (data?.teams) {
            initGame(data.teams)
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
                            <GameActions isTeamA team={data?.teams[0]} handleBoost={()=> activateBoost(0)} />
                            <Game1Board {...data} />
                            <GameActions team={data?.teams[1]} handleBoost={()=> activateBoost(1)} />
                        </>
                    )
                }
            </View>
        </Container>
    );
}
