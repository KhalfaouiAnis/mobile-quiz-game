import { Pressable, View } from "react-native";
import { boxShadow } from "@/src/utils/cn";
import ShadowedText from "../../shared/text/ShadowedText";

export default function BoosterButton({ onPress, disabled }: { borderColor?: string, onPress: any, disabled?: boolean }) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
        >
            <View
                className="items-center justify-center rounded-[8px] px-1 ms-2"
                style={[
                    boxShadow(3, 3, 0, 0, "rgb(000 000 000 / 1)").button,
                    { backgroundColor: disabled ? "#A8A8A8" : "#F1190E" }
                ]}
            >
                <ShadowedText fontSize={18} content={"x2"} fillColor={"#fff"} />
            </View>
        </Pressable>
    )
}