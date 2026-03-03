import { VIEW_SCALE_FACTOR } from "@/core/constants";
import ScoreAdjuster from "../buttons/score-adjuster";
import DoublePoints from "./double-points";
import { Pressable, Text, View } from "react-native";
import { Team } from "@/core/types";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useGame1SessionMutations } from "@/core/services/game1/session/session.mutations";
import { boxShadow } from "@/core/utils/cn";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

interface Props {
    team?: Partial<Team>
    isTeamA?: boolean
    boostActive?: boolean
    handleBoost: any,
}

export default function GameActions({ isTeamA, team, handleBoost, boostActive }: Props) {
    const { sessionId } = useGlobalSearchParams<{ sessionId: string }>();
    const { updateGame1SessionStatus: { mutate } } = useGame1SessionMutations()
    const router = useRouter()

    const handlePress = async () => {
        if (isTeamA) {
            mutate({ sessionId: Number(sessionId), action: "end" })
            return router.replace("/")
        }
        router.back()
    }

    return (
        <View
            className="py-1 px-2"
            style={{ width: 94 * VIEW_SCALE_FACTOR, backgroundColor: isTeamA ? "#FFF900" : "#00A6DA" }}
        >
            <View
                style={[
                    {
                        width: 82 * VIEW_SCALE_FACTOR,
                        height: 70 * VIEW_SCALE_FACTOR,
                        borderColor: isTeamA ? "#00A6DA" : "#FFF900"
                    },
                    boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button
                ]}
                className="bg-white items-center justify-center border-2 rounded-lg mb-2"
            >
                <Text className="font-cairo-bold text-error text-2xl text-center" numberOfLines={2} ellipsizeMode="tail">{team?.name}</Text>
            </View>
            <ScoreAdjuster
                team={team}
                colors={{ border: "#00A6DA", icon: isTeamA ? "#00A6DA" : "#FFF900", text: isTeamA ? "#FFF900" : "#00A6DA" }}
            />
            <DoublePoints
                boosterDisabled={team?.is_boost_used || boostActive}
                borderColor={isTeamA ? "#00A6DA" : "#FFF900"}
                onPress={handleBoost}
            />
            <Pressable
                className="bg-white flex-row items-center justify-center my-2 gap-3 border-2 rounded-lg"
                onPress={handlePress}
                style={[{
                    width: 82 * VIEW_SCALE_FACTOR,
                    height: 40 * VIEW_SCALE_FACTOR,
                    borderColor: isTeamA ? "#00A6DA" : "#FFF900"
                }, boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button]}
            >
                <Text className="text-error font-cairo-bold text-2xl">
                    {isTeamA ? "انهاء" : "رجوع"}
                </Text>
                {
                    isTeamA ? (
                        <FontAwesome6 name="close" color="#F1190E" size={16 * VIEW_SCALE_FACTOR} />
                    ) : (
                        <Ionicons name="log-out-outline" color="#F1190E" size={16 * VIEW_SCALE_FACTOR} />
                    )
                }
            </Pressable>
        </View>
    )
}