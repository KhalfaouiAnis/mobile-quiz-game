import { Image, Pressable, Text, View } from "react-native";
import ActivePlanBadge from "./ActivePlanBadge";
import { Package } from "@/src/types/index.types";
import { IMAGES } from "@/src/constants/images";
import { boxShadow } from "@/src/utils/cn";

type Props = Partial<Package> & {
    iconUrl: any;
    isActive: boolean;
    selected: boolean;
    onPress: () => void
}

export default function SubscriptionCard({ iconUrl, isActive, selected, name, description, price, onPress }: Props) {
    return (
        <Pressable
            onPress={onPress}
            style={[boxShadow(4, 4, 4, 0).button, {
                borderWidth: selected ? 1 : undefined,
                borderColor: selected ? "#F1190E" : undefined,
                width: 340
            }]}
            className="relative flex-row items-center bg-white px-10 py-6 rounded-2xl"
        >
            {
                isActive && (
                    <Image
                        source={IMAGES.ActivePlanBadge}
                        style={{ position: "absolute", start: -17, top: -14, width: 100, height: 100 }} />
                )
            }
            <View>
                <Image
                    source={iconUrl}
                    style={{ width: 48, height: 48, objectFit: "contain" }} />
            </View>
            <View className="flex-1 ms-6 me-10">
                <View className="flex-row items-center">
                    <Text className="font-cairo-bold">{name}</Text>
                    {isActive && <ActivePlanBadge />}
                </View>
                <Text className="flex-1 font-bagel-regular text-gray-600" numberOfLines={1} ellipsizeMode="tail">{description}</Text>
            </View>
            <View className="ms-auto">
                <Text className="font-bagel-regular text-lg text-[#1977F2]">{price} $</Text>
                <Text className="font-bagel-regular text-xs text-gray-600">في الشهر</Text>
            </View>
        </Pressable>
    )
}