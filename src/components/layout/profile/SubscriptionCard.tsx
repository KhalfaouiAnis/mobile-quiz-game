import { Image, Pressable, Text, View } from "react-native";
import ActivePlanBadge from "./ActivePlanBadge";
import { Package } from "@/src/types/index.types";
import { IMAGES } from "@/src/constants/images";
import { boxShadow } from "@/src/utils/cn";
import { scale, verticalScale } from "@/src/utils/dimensions";

export type SubscriptionCardProps = Partial<Package> & {
    iconUrl: any;
    isActive: boolean;
    selected: boolean;
    onPress: () => void
}

export default function SubscriptionCard({ iconUrl, isActive, selected, name, description, price, onPress }: SubscriptionCardProps) {
    return (
        <Pressable
            onPress={onPress}
            style={[boxShadow(4, 4, 4, 0), {
                borderWidth: selected ? 1 : undefined,
                borderColor: selected ? "#F1190E" : undefined,
                width: "auto", height: verticalScale(80), flex: 1
            }]}
            className="relative flex-row items-center bg-white px-2 py-6 rounded-2xl"
        >
            {
                isActive && (
                    <Image
                        source={IMAGES.ActivePlanBadge}
                        style={{ position: "absolute", start: -10, top: -8, width: scale(70), height: scale(70) }} />
                )
            }
            <View>
                <Image
                    source={iconUrl}
                    style={{ width: scale(50), height: scale(50), objectFit: "contain" }} />
            </View>
            <View className="flex-1 mx-2">
                <View className="flex-row items-center">
                    <Text className="font-cairo-bold">{name}</Text>
                    {isActive && <ActivePlanBadge />}
                </View>
                <Text className=" font-bagel-regular text-gray-600" numberOfLines={1} ellipsizeMode="tail">{description}</Text>
            </View>
            <View className="ms-auto">
                <Text className="font-bagel-regular  text-[#1977F2]">${price}</Text>
                <Text className="font-bagel-regular text-xs text-gray-600">في الشهر</Text>
            </View>
        </Pressable>
    )
}