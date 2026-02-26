import Game1Board from "@/core/components/game1/game-board";
import GameActions from "@/core/components/game1/teams/game-actions";
import Container from "@/core/components/ui/shared/container";
import { useSessionGameBoardQuery } from "@/core/services/game1/session/session.queries";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function GameBoard() {
    const { sessionId } = useLocalSearchParams<{ sessionId: string }>()
    const { data, isLoading } = useSessionGameBoardQuery(Number(sessionId))

    return (
        <Container backgroundColor="#FFF">
            <View className="flex-1 flex-row content-center">
                <GameActions isTeamA team={data?.data?.teams[0]} />
                {
                    (isLoading || !data?.data) ? (
                        <ActivityIndicator />
                    ) : (
                        <Game1Board {...data.data} />
                    )
                }
                <GameActions team={data?.data?.teams[1]} />
            </View>
        </Container>
    );
}
