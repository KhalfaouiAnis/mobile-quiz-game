import { boxShadow } from "@/core/utils/cn";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";
import { NameTextInput } from "./input/name-field";
import { useFormContext } from "react-hook-form";
import { CreateGame1SessionRequest } from "@/core/types/schema/game1";
import ScoreStepper from "./input/score-stepper";
import { toast } from "sonner-native";
import { useGame1SessionMutations } from "@/core/services/game1/session/session.mutations";
import { useGame1Actions } from "@/core/store/game1.store";
import { useRouter } from "expo-router";
import { GAME1_QUESTION_TIME, TEXT_SCALE_FACOTR, VIEW_SCALE_FACTOR } from "@/core/constants";
import { isAxiosError } from "axios";
import GameTimePicker from "../ui/shared/game-time-picker";

export default function GameSetup() {
    const { createGame1Session: { mutateAsync, isPending } } = useGame1SessionMutations();
    const { control, handleSubmit, formState: { errors } } = useFormContext<CreateGame1SessionRequest>()
    const { initGame } = useGame1Actions()
    const router = useRouter()

    const handleErrors = (err: any) => {
        if (err.sub_category_ids?.message) {
            toast.error(err.sub_category_ids.message)
        }
    }

    const onSubmit = async (payload: CreateGame1SessionRequest) => {
        try {
            const data = await mutateAsync(payload);
            if (data) {
                initGame(data.game_session.teams, data.game_session.question_time_limit);
                router.replace(`/game1/${data.game_session.id}`)
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message)
            }
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View className="items-center">
                <View className="flex-row items-center gap-4">
                    <View className="gap-4">
                        <View className="gap-1">
                            {/* <TeamNamePicker control={control} name="teams.0.name" label="الفريق A" /> */}
                            <NameTextInput control={control} name="teams.0.name" />
                        </View>
                        <ScoreStepper
                            colors={{ border: "#00A6DA", icon: "#F1190E", text: "#FFF900" }}
                            control={control} name="teams.0.score"
                        />
                    </View>
                    <View>
                        <GameTimePicker control={control} name="question_time_limit" options={GAME1_QUESTION_TIME} />
                    </View>
                    <View className="gap-4">
                        <View className="gap-1">
                            {/* <TeamNamePicker control={control} name="teams.1.name" label="الفريق B" /> */}
                            <NameTextInput control={control} name="teams.1.name" />
                        </View>
                        <ScoreStepper
                            colors={{ border: "#00A6DA", icon: "#F1190E", text: "#00A6DA" }}
                            control={control} name="teams.1.score"
                        />
                    </View>
                </View>
                {
                    errors.sub_category_ids && (
                        <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={{ maxWidth: 200 * TEXT_SCALE_FACOTR }}
                            className="text-error text-sm text-center font-cairo mt-1"
                        >
                            {errors.sub_category_ids.message}
                        </Text>
                    )
                }
                <Pressable
                    className='mt-4'
                    disabled={isPending}
                    onPress={handleSubmit(onSubmit, handleErrors)}
                >
                    <View
                        style={{
                            boxShadow: boxShadow().button.boxShadow,
                            width: 130 * VIEW_SCALE_FACTOR
                        }}
                        className="bg-secondary-500 rounded-xl p-1 items-center border border-error disabled:bg-gray-200"
                    >
                        {isPending ? <ActivityIndicator size="small" /> : <Text className='font-cairo-bold text-lg'>ابدا اللعب</Text>}
                    </View>
                </Pressable>

            </View>
        </KeyboardAvoidingView>
    )
}