import { boxShadow } from "@/src/utils/cn";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

interface Props {
    description: string;
    cancelButton: {
        action: () => void;
        title: string
    },
    actionButton: {
        action: () => void;
        title: string,
        loading?: boolean
    }
}

export default function GenericModal({ description, cancelButton, actionButton }: Props) {
    return (
        <View
            className="items-center justify-center p-6 bg-white rounded-xl"
            style={boxShadow(0, 16, 32, 0, "rgb(000 000 000 / 0.23)")}
        >
            <Text className="font-cairo-semibold text-xl">{description}</Text>
            <View className="flex-row items-center gap-4 mt-10">
                <Pressable
                    onPress={cancelButton.action}
                    style={{ width: 140, height: 44, boxShadow: boxShadow().boxShadow, borderRadius: 16, borderColor: "#A8A8A8", borderWidth: 0.5 }}
                    className="bg-white items-center justify-center">
                    <Text className="font-cairo-bold text-black">{cancelButton.title}</Text>
                </Pressable>
                <Pressable
                    onPress={actionButton.action}
                    style={{ width: 140, height: 44, borderRadius: 16 }}
                    className="bg-error items-center justify-center">
                    {
                        actionButton.loading ? <ActivityIndicator color="#F59E0B" size="small" /> : <Text className="font-cairo-bold text-white">{actionButton.title}</Text>
                    }
                </Pressable>
            </View>
        </View>
    )
}