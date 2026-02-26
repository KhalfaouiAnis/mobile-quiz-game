import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { Dimensions, Pressable, Text, View } from "react-native";
import { Image } from "expo-image"
import { IMAGES } from "@/core/constants/images";
import { boxShadow } from "@/core/utils/cn";
import { SubCategory } from "@/core/types";

export const CATEGORY_ITEM_HIGHT = 72 * VIEW_SCALE_FACTOR
export const SUBCATEGORY_ITEM_WIDTH = (Dimensions.get("window").width / 5) * VIEW_SCALE_FACTOR

export function Game1Subcategory({ name, image_url, onPress }: Partial<SubCategory> & { onPress: () => void }) {
    return (
        <Pressable
            onPress={onPress}
            className="px-2 rounded-2xl items-center justify-center border border-primary-500"
            style={[boxShadow(4, 4, 0, 0, "rgb(0 166 218 / 1)").button, { width: SUBCATEGORY_ITEM_WIDTH * VIEW_SCALE_FACTOR, height: 72 * VIEW_SCALE_FACTOR }]}
        >
            <Image
                style={{ width: 40 * VIEW_SCALE_FACTOR, height: 40 * VIEW_SCALE_FACTOR }}
                source={image_url ? { uri: image_url } : IMAGES.Category}
                className="rounded-full"
                contentFit="contain"
            />
            <Text className="font-cairo-bold text-sm" ellipsizeMode="tail" numberOfLines={1}>{name}</Text>
        </Pressable>
    )
}

export function Game1BoardSubcategory({ name, image_url }: Partial<SubCategory>) {
    return (
        <View
            className="relative items-center justify-center rounded-xl bg-white"
        >
            <Image
                style={{
                    height: 74 * VIEW_SCALE_FACTOR,
                    width: (Dimensions.get("window").width / 10) * VIEW_SCALE_FACTOR,
                }}
                source={image_url ? { uri: image_url } : IMAGES.FilmsCategory}
                className="rounded-xl absolute -z-10"
                contentFit="cover"
            />
            <View className="w-full h-full items-center justify-center absolute bg-black opacity-50 rounded-xl z-20">
                <Text numberOfLines={2} ellipsizeMode="tail" className="text-white text-center absolute">{name}</Text>
            </View>
        </View>
    )
}