import { TEXT_SCALE_FACOTR, VIEW_SCALE_FACTOR } from "@/core/constants";
import DoublePoints from "./double-points";
import { Pressable, Text, View } from "react-native";
import { Team } from "@/core/types";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useGame1SessionMutations } from "@/core/services/game1/session/session.mutations";
import { boxShadow } from "@/core/utils/cn";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import IncreaseIcon from "@/assets/svg/increase";
import DecreaseIcon from "@/assets/svg/decrease";
import { useGame1Actions } from "@/core/store/game1.store";
import { useAudioPlayer } from "expo-audio";
import { SOUND_EFFECTS } from "@/core/constants/audio";
import { moderateScale, scale, verticalScale } from "@/core/utils/sizes";
import { formatScore } from "@/core/utils";

interface Props {
    team?: Partial<Team>
    isTeamA?: boolean
    boostActive?: boolean
    handleBoost: any,
}

export default function GameActions({ isTeamA, team, handleBoost, boostActive }: Props) {
    const { sessionId } = useGlobalSearchParams<{ sessionId: string }>();
    const { updateGame1TeamScore: { mutate: updateScore, isPending } } = useGame1SessionMutations()
    const audioPlayer = useAudioPlayer(SOUND_EFFECTS.DoubleScore);
    const { addScore } = useGame1Actions();
    const { updateGame1SessionStatus: { mutate } } = useGame1SessionMutations()
    const router = useRouter()

    const handleQuit = async () => {
        if (isTeamA) {
            mutate({ sessionId: Number(sessionId), action: "end" })
            return router.replace("/")
        }
        router.back()
    }

    const handleIncreaseScore = () => {
        if (team) {
            updateScore({ id: team?.id || 0, score: (team.score || 0) + 100, session_id: Number(sessionId) })
            addScore(isTeamA ? 0 : 1, 100, false);
            audioPlayer.seekTo(0);
            audioPlayer.play()
        }
    }

    const handleDecreaseScore = () => {
        if ((team?.score && team.score - 100 < 0)) return;
        if (team) {
            updateScore({ id: team?.id || 0, score: (team.score || 0) - 100, session_id: Number(sessionId) })
            addScore(isTeamA ? 0 : 1, -100, false);
            audioPlayer.seekTo(0);
            audioPlayer.play()
        }
    }

    return (
        <View
            className="items-center justify-between py-1"
            style={{
                width: scale(120) * VIEW_SCALE_FACTOR,
                height: verticalScale(428) * VIEW_SCALE_FACTOR,
                backgroundColor: isTeamA ? "#FFF900" : "#00A6DA",
            }}
        >
            <View
                style={{
                    width: scale(103) * VIEW_SCALE_FACTOR,
                    borderColor: isTeamA ? "#00A6DA" : "#FFF900",
                    height: verticalScale(90) * VIEW_SCALE_FACTOR,
                    boxShadow: boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button.boxShadow
                }}
                className="bg-white items-center justify-center border-2 rounded-lg"
            >
                <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{ fontSize: moderateScale(24) }}
                    className="font-cairo-bold text-error text-center"
                >
                    {team?.name}
                </Text>
            </View>
            <View
                style={{
                    boxShadow: boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button.boxShadow,
                    height: verticalScale(190) * VIEW_SCALE_FACTOR,
                    width: scale(103) * VIEW_SCALE_FACTOR,
                    borderColor: isTeamA ? "#00A6DA" : "#FFF900",
                }}
                className="bg-white items-center justify-around border-2 rounded-xl"
            >
                <Pressable
                    disabled={isPending}
                    onPress={handleIncreaseScore}
                >
                    <IncreaseIcon size={scale(50) * VIEW_SCALE_FACTOR} color={isPending ? "#e5e7eb" : isTeamA ? "#00A6DA" : "#FFF900"} />
                </Pressable>
                <Text
                    style={{
                        textShadowRadius: 1,
                        color: isTeamA ? "#FFF900" : "#00A6DA",
                        textShadowColor: "rgba(0, 0, 0, 0.15)",
                        textShadowOffset: { width: 4, height: 4 },
                        fontSize: moderateScale(30) * TEXT_SCALE_FACOTR,
                    }}
                    className="font-bagel-regular">
                    {formatScore(team?.score || 0)}
                </Text>
                <Pressable
                    disabled={isPending}
                    onPress={handleDecreaseScore}
                >
                    <DecreaseIcon size={scale(50) * VIEW_SCALE_FACTOR} color={isPending ? "#e5e7eb" : undefined} />
                </Pressable>
            </View>
            <DoublePoints
                boosterDisabled={team?.is_boost_used || boostActive}
                borderColor={isTeamA ? "#00A6DA" : "#FFF900"}
                onPress={handleBoost}
            />
            <Pressable
                onPress={handleQuit}
                className="bg-white flex-row items-center justify-around border-2 rounded-lg"
                style={{
                    width: scale(103) * VIEW_SCALE_FACTOR,
                    borderColor: isTeamA ? "#00A6DA" : "#FFF900",
                    height: verticalScale(46) * VIEW_SCALE_FACTOR,
                    boxShadow: boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button.boxShadow
                }}
            >
                <Text
                    style={{ fontSize: moderateScale(22), paddingBottom: isTeamA ? undefined : 4 }}
                    className="text-error font-cairo-bold"
                >
                    {isTeamA ? "انهاء" : "رجوع"}
                </Text>
                {
                    isTeamA ? (
                        <FontAwesome6 name="close" color="#F1190E" size={moderateScale(20) * VIEW_SCALE_FACTOR} />
                    ) : (
                        <Ionicons name="log-out-outline" color="#F1190E" size={moderateScale(20) * VIEW_SCALE_FACTOR} />
                    )
                }
            </Pressable>
        </View>
    )
}