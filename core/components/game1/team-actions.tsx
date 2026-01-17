import { boxShadow } from "@/core/utils/cn";
import { Pressable, Text, View } from "react-native";
import PlusMinus from "./buttons/plus-minus";
import NamePicker from "./buttons/name-picker";

export default function TeamActions() {
    return (
        <View className="items-center">
            <View className="flex-row items-center gap-4 rounded-lg">
                <NamePicker name="Team A" />
                <NamePicker name="Team B" />
            </View>
            <View className="flex-row items-center gap-4 rounded-lg mt-3">
                <PlusMinus
                    count={4}
                    isTeamA
                    minusAction={() => { }}
                    plusAction={() => { }}
                />
                <PlusMinus
                    count={4}
                    minusAction={() => { }}
                    plusAction={() => { }}
                />
            </View>
            <Pressable className='mt-4'>
                <View
                    style={boxShadow().button}
                    className="bg-secondary-500 rounded-xl p-1 px-6 border border-error"
                >
                    <Text className='font-cairo-bold text-lg'>ابدا اللعب</Text>
                </View>
            </Pressable>
        </View>
    )
}