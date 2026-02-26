import { VIEW_SCALE_FACTOR } from "@/core/constants";
import PlusMinus from "../buttons/plus-minus";
import QuitGame from "../buttons/quit-game";
import DoublePoints from "./double-points";
import { View } from "react-native";
import TeamName from "./team-name";
import { Team } from "@/core/types";
import { useRouter } from "expo-router";
import { useUpdateGame1SessionStatus } from "@/core/services/game1/session/session.mutations";

interface Props {
    team?: Team
    isTeamA?: boolean
}

export default function GameActions({ isTeamA, team }: Props) {
    const { mutate } = useUpdateGame1SessionStatus()
    const router = useRouter()

    const handlePress = async () => {
        if (isTeamA) {
            mutate({sessionId: 1, action: "end"})
            return router.replace("/")
        }

        router.back()
    }

    return (
        <View
            className="py-1 px-2"
            style={{ width: 94 * VIEW_SCALE_FACTOR, backgroundColor: isTeamA ? "#FFF900" : "#00A6DA" }}
        >
            <TeamName name={team?.name || ""} isTeamA={isTeamA} />
            <PlusMinus
                isVertical
                isTeamA={isTeamA}
                plusAction={() => { }}
                minusAction={() => { }}
                score={team?.score || 0}
            />
            <DoublePoints isTeamA={isTeamA} sessionId={team?.session_id} />
            <QuitGame isTeamA={isTeamA} onPress={handlePress} />
        </View>
    )
}