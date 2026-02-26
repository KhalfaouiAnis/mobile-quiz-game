import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { IMAGES } from "@/core/constants/images";
import { boxShadow } from "@/core/utils/cn";
import { Image, Pressable, Text, View } from "react-native";
import ActivePlanBadge from "./active-plan-badge";
import { Package } from "@/core/types";

type Props = Partial<Package> & {
    iconUrl: any;
    isActive: boolean
    onPress: () => void
}

export default function SubscriptionCard({ iconUrl, isActive, name, description, price }: Props) {
    return (
        <Pressable
            style={[boxShadow(4, 4, 4, 0).button, {
                borderWidth: isActive ? 1 : undefined,
                borderColor: isActive ? "#F1190E" : undefined,
                width: 340 * VIEW_SCALE_FACTOR
            }]}
            className="relative flex-row items-center bg-white px-10 py-6 rounded-2xl"
        >
            {
                isActive && (
                    <Image
                        source={IMAGES.ActivePlanBadge}
                        style={{ position: "absolute", start: -17, top: -14, width: 100 * VIEW_SCALE_FACTOR, height: 100 * VIEW_SCALE_FACTOR }} />
                )
            }
            <View>
                <Image
                    source={iconUrl}
                    style={{ width: 48 * VIEW_SCALE_FACTOR, height: 48 * VIEW_SCALE_FACTOR, objectFit: "contain" }} />
            </View>
            <View className="flex-1 ms-6 me-10">
                <View className="flex-row items-center">
                    <Text className="font-cairo-bold">{name}</Text>
                    {isActive && <ActivePlanBadge />}
                </View>
                <Text className="flex-1 font-bagel-regular text-gray-600" numberOfLines={1} ellipsizeMode="tail">{description}</Text>
            </View>
            <View className="ms-auto">
                <Text className="font-bagel-regular text-lg text-primary-500">{price} $</Text>
                <Text className="font-bagel-regular text-xs text-gray-600">في الشهر</Text>
            </View>
        </Pressable>
    )
}