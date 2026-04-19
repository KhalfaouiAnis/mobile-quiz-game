import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Team } from "@/src/types/game.gadha.types";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { boxShadow } from "@/src/utils/cn";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useGadhaGameActions } from "@/src/stores/game.gadha.store";
import { moderateScale, scale, verticalScale } from "@/src/utils/sizes";
import { formatScore } from "@/src/utils";
import { useUpdateTeamScore } from "@/src/hooks/mutations/gameGadha/useUpdateTeamScore";
import useEndGadhaSession from "@/src/hooks/mutations/gameGadha/useEndGadhaSession";
import { useState } from "react";
import GenericModal from "@/src/components/shared/modal/GenericModalContent";
import AppModal from "@/src/components/shared/modal/AppModal";
import { toast } from "sonner-native";
import { Image } from "expo-image";
import { IMAGES } from "@/src/constants/images";
import ShadowedText from "@/src/components/shared/text/ShadowedText";
import { fontScale } from "@/src/utils/dimensions";
import UserActionButtons from "./UserActionButtons";

interface Props {
    team?: Partial<Team>
    isTeamA?: boolean
    boostActive?: boolean
    handleBoost: any,
}

export default function GameActions({ isTeamA, team, handleBoost, boostActive }: Props) {
    const { id } = useGlobalSearchParams<{ id: string }>();
    const { mutate: updateScore, isPending } = useUpdateTeamScore()
    const { mutate: endSession, isPending: endingSession } = useEndGadhaSession()
    const { addScore } = useGadhaGameActions();
    const [showModal, setShowModal] = useState(false);
    const router = useRouter()

    const handleQuit = async () => {
        if (isTeamA) {
            endSession({ id: Number(id) }, {
                onSuccess() {
                    return router.replace("/")
                },
                onError(error) {
                    toast.error(error.message)
                },
            })
        }

        router.replace("/")
    }

    const handleIncreaseScore = () => {
        if (team) {
            updateScore({ teamId: team?.id || 0, score: (team.score || 0) + 100, session_id: Number(id) })
            addScore(isTeamA ? 0 : 1, 100, false);
        }
    }

    const handleDecreaseScore = () => {
        if ((team?.score ?? 0) <= 0) return;
        updateScore({ teamId: team?.id || 0, score: (team?.score ?? 0) - 100, session_id: Number(id) })
        addScore(isTeamA ? 0 : 1, -100, false);
    }

    return (
        <View
            style={{
                height: "100%",
                width: scale(120),
                paddingVertical: 6,
                alignItems: "center",
                backgroundColor: "#00a6da",
                justifyContent: "space-between",
            }}
        >
            <View
                style={{
                    borderWidth: 3,
                    width: scale(103),
                    borderColor: "#00a6da",
                    height: verticalScale(90),
                    boxShadow: boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button.boxShadow
                }}
                className="bg-white items-center justify-center rounded-lg"
            >
                <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{ fontSize: moderateScale(22), lineHeight: 28 }}
                    className="font-cairo-bold text-error text-center"
                >
                    {team?.name}
                </Text>
            </View>
            <View
                style={{
                    boxShadow: boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button.boxShadow,
                    height: verticalScale(190),
                    borderColor: "#00a6da",
                    width: scale(103),
                    borderWidth: 3,
                }}
                className="bg-white items-center justify-around rounded-xl"
            >
                <Pressable
                    disabled={isPending}
                    onPress={handleIncreaseScore}
                >
                    <Image source={IMAGES.BluePlus} style={{ width: 40, height: 40, }} contentFit="contain" />
                </Pressable>
                <ShadowedText fontSize={28} content={formatScore(team?.score || 0)} fillColor={"#f1190e"} />
                <Pressable
                    disabled={isPending}
                    onPress={handleDecreaseScore}
                >
                    <Image source={IMAGES.BlueMinus} style={{ width: 40, height: 40, }} contentFit="contain" />
                </Pressable>
            </View>
            <UserActionButtons
                block={{ disabled: true, onPress: () => { } }}
                boost={{ disabled: team?.is_boost_used || boostActive, onPress: handleBoost }} />
            <Pressable
                onPress={() => setShowModal(true)}
                className="bg-white flex-row items-center justify-around border-2 rounded-lg"
                style={{
                    borderWidth: 3,
                    width: scale(103),
                    height: verticalScale(46),
                    borderColor: "#00a6da",
                    boxShadow: boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button.boxShadow
                }}
            >
                <Text
                    style={{ fontSize: fontScale(22), paddingBottom: isTeamA ? undefined : 6 }}
                    className="text-error font-cairo-bold"
                >
                    {isTeamA ? "انهاء" : "رجوع"}
                </Text>
                {
                    isTeamA ? endingSession ? <ActivityIndicator size="small" /> : (
                        <FontAwesome6 name="close" color="#F1190E" size={fontScale(20)} />
                    ) : (
                        <Ionicons name="log-out-outline" color="#F1190E" size={fontScale(20)} className="pt-1" />
                    )
                }
            </Pressable>
            <AppModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                content={<GenericModal
                    description={
                        isTeamA ? "هل تريد تأكيد الانتهاء والعودة إلى الصفحة الرئيسية؟" : "هل تريد تأكيد الخروج والعودة إلى الصفحة الرئيسية؟"
                    }
                    cancelButton={{ title: "لا، أكمل اللعبة", action: () => setShowModal(false) }}
                    actionButton={{ title: "نعم", action: handleQuit, loading: endingSession }}
                />}
            />
        </View>
    )
}