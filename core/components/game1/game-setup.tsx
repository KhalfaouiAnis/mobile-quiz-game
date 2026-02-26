import { boxShadow } from "@/core/utils/cn";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";
import { NameTextInput } from "./input/name-field";
import { useFormContext } from "react-hook-form";
import { Game1SetupValues } from "@/core/types/schema/game1";
import ScoreStepper from "./input/score-stepper";

export default function GameSetup() {
    const { control } = useFormContext<Game1SetupValues>()

    const handleStartGame = async () => {
        try {

        } catch (error) {

        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View className="items-center">
                <View className="flex-row items-center gap-4 rounded-lg">
                    <NameTextInput control={control} name="teams.0.name" placeholder="Team 1 (Red)" />
                    <NameTextInput control={control} name="teams.1.name" placeholder="Team 2 (Blue)" />
                </View>
                <View className="flex-row items-center gap-4 rounded-lg mt-3">
                    <ScoreStepper 
                        colors={{ border: "#00A6DA", icon: "#00A6DA", text: "#FFF900" }}
                        control={control} name="teams.0.score"
                    />
                    <ScoreStepper 
                        colors={{ border: "#00A6DA", icon: "#00A6DA", text: "#FFF900" }}
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
                        {
                            false ? <ActivityIndicator size="small" /> : <Text className='font-cairo-bold text-lg'>ابدا اللعب</Text>
                        }
                    </View>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
}