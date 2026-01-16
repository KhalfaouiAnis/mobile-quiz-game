import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { boxShadow } from "@/core/utils/cn";
import { Text, View } from "react-native";

export default function SubcategoryListHeader({ title }: { title: string }) {
    return (
        <View
            style={[boxShadow(4, 4, 4, 0, "rgb(000 000 000 / 0.75)").button, { width: 420 * VIEW_SCALE_FACTOR }]}
            className="items-center py-1 px-20 border border-secondary-500"
        >
            <Text className="font-bagel-regular text-primary-500 text-2xl">{title}</Text>
        </View>
    )
}