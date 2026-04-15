import { boxShadow } from "@/src/utils/cn";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner-native";
import { useRouter } from "expo-router";
import { GADHA_QUESTION_TIME_OPTIONS, TEXT_SCALE_FACOTR } from "@/src/constants";
import { isAxiosError } from "axios";
import GadhaGameTimePicker from "./GadhaGameTimerPicker";
import ScoreStepper from "./buttons/ScoreStepper";
import TeamNamePicker from "./TeamNamePicker";
import { useCreateGadhaSession } from "@/src/hooks/mutations/gameGadha/useCreateGadhaSession";
import { CreateGadhaGameSession } from "@/src/types/game.gadha.types";
import { useGadhaGameActions } from "@/src/stores/game.gadha.store";

export default function GameSetup() {
    const router = useRouter()
    const { initGame } = useGadhaGameActions()
    const { mutateAsync, isPending } = useCreateGadhaSession();
    const { control, handleSubmit, formState: { errors } } = useFormContext<CreateGadhaGameSession>()

    const handleErrors = (err: any) => {
        if (err.subcategoryIds?.message) {
            toast.error(err.subcategoryIds.message)
        }
    }

    const onSubmit = async (payload: CreateGadhaGameSession) => {
        try {
            const data = await mutateAsync(payload);
            if (data) {
                initGame(data.teams, data.questionTimeLimit);
                router.push(`/(gadha)/board/${data.sessionId}`);
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
                            <TeamNamePicker control={control} name="teams.0.name" />
                        </View>
                        <ScoreStepper
                            control={control}
                            name="teams.0.score"
                            colors={{ border: "#00A6DA", text: "#FFF900" }}
                        />
                    </View>
                    <View>
                        <GadhaGameTimePicker control={control} name="questionTimeLimit" options={GADHA_QUESTION_TIME_OPTIONS} />
                    </View>
                    <View className="gap-4">
                        <View className="gap-1">
                            <TeamNamePicker control={control} name="teams.1.name" />
                        </View>
                        <ScoreStepper
                            control={control}
                            name="teams.1.score"
                            colors={{ border: "#00A6DA", text: "#00A6DA" }}
                        />
                    </View>
                </View>
                {
                    errors.subcategoryIds && (
                        <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={{ maxWidth: 200 * TEXT_SCALE_FACOTR }}
                            className="text-error text-sm text-center font-cairo mt-1"
                        >
                            {errors.subcategoryIds.message}
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
                            width: 160,
                            height: 48
                        }}
                        className="bg-secondary-500 rounded-xl rounded-t-2xl items-center justify-center border border-error disabled:bg-gray-200"
                    >
                        {isPending ? <ActivityIndicator size="small" /> : <Text className='font-cairo-bold text-lg'>ابدأ اللعب</Text>}
                    </View>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
}