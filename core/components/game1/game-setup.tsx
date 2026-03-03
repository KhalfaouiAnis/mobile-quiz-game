import { boxShadow } from "@/core/utils/cn";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";
import { NameTextInput } from "./input/name-field";
import { useFormContext } from "react-hook-form";
import { CreateGame1SessionRequest } from "@/core/types/schema/game1";
import ScoreStepper from "./input/score-stepper";
import { toast } from "sonner-native";
import { useGame1SessionMutations } from "@/core/services/game1/session/session.mutations";
import { useGame1Actions } from "@/core/store/game1.store";

export default function GameSetup() {
    const { control, handleSubmit, formState: { isSubmitting, errors } } = useFormContext<CreateGame1SessionRequest>()
    const { createGame1Session: { mutateAsync } } = useGame1SessionMutations();
    const { initGame } = useGame1Actions()

    const handleErrors = (err: any) => {
        if (err.teams?.message) {
            toast.error(err.teams.message)
        }

        if (err.sub_category_ids?.message) {
            toast.error(err.sub_category_ids.message)
        }
    }

    const onSubmit = async (payload: CreateGame1SessionRequest) => {
        try {
            const data = await mutateAsync(payload);
            if (data) {
                initGame(data.game_session.teams)
            }
        } catch (error) {
        }
    };

    const handleStartGame = async () => {
        try {
            handleErrors(errors);
            handleSubmit(onSubmit, err => handleErrors(err))
        } catch (error) {
            toast.error(error as unknown as any)
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View className="items-center">
                <View className="flex-row items-center gap-4 rounded-lg">
                    <NameTextInput control={control} name="teams.0.name" label="الفريق A" />
                    <NameTextInput control={control} name="teams.1.name" label="الفريق B" />
                </View>
                <View className="flex-row items-center gap-4 rounded-lg mt-3">
                    <ScoreStepper
                        colors={{ border: "#00A6DA", icon: "#F1190E", text: "#FFF900" }}
                        control={control} name="teams.0.score"
                    />
                    <ScoreStepper
                        colors={{ border: "#00A6DA", icon: "#F1190E", text: "#00A6DA" }}
                        control={control} name="teams.1.score"
                    />
                </View>
                <Pressable
                    className='mt-4'
                    onPress={handleStartGame}
                >
                    <View
                        style={boxShadow().button}
                        className="bg-secondary-500 rounded-xl p-1 px-6 border border-error"
                    >
                        {isSubmitting ? <ActivityIndicator size="small" /> : <Text className='font-cairo-bold text-lg'>ابدا اللعب</Text>}
                    </View>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
}