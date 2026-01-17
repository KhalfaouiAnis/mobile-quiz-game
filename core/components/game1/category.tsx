import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { Dimensions, Pressable, Text } from "react-native";
import { Image } from "expo-image"
import { IMAGES } from "@/core/constants/images";
import { boxShadow } from "@/core/utils/cn";
import { Category, SubCategory } from "@/core/types";
import { useGameOneCategoryStore } from "@/core/store/category.store";

export const CATEGORY_ITEM_HIGHT = 72 * VIEW_SCALE_FACTOR
export const SUBCATEGORY_ITEM_WIDTH = (Dimensions.get("window").width / 5) * VIEW_SCALE_FACTOR

export default function Game1Category({ name, image_url, category_id }: Partial<Category>) {
    const { setCategoryId } = useGameOneCategoryStore()
    function handlePress() { setCategoryId(category_id) }

    return (
        <Pressable
            onPress={handlePress}
            style={[boxShadow(4, 4, 0, 0, "rgb(0 166 218 / 1)").button, { width: 125 * VIEW_SCALE_FACTOR, height: 72 * VIEW_SCALE_FACTOR }]}
            className="px-2 rounded-2xl items-center justify-center border border-primary-500"
        >
            <Image
                style={{ width: 30 * VIEW_SCALE_FACTOR, height: 30 * VIEW_SCALE_FACTOR }}
                source={image_url ? { uri: image_url } : IMAGES.Category}
                className="rounded-full"
                contentFit="contain"
            />
            <Text className="font-cairo-bold" ellipsizeMode="tail" numberOfLines={1}>{name}</Text>
        </Pressable>
    )
}

export function Game1Subcategory({ name, image_url }: Partial<SubCategory>) {
    return (
        <Pressable
            style={[boxShadow(4, 4, 0, 0, "rgb(0 166 218 / 1)").button, { width: SUBCATEGORY_ITEM_WIDTH * VIEW_SCALE_FACTOR, height: 72 * VIEW_SCALE_FACTOR }]}
            className="px-2 rounded-2xl items-center justify-center border border-primary-500"
        >
            <Image
                style={{ width: 40 * VIEW_SCALE_FACTOR, height: 40 * VIEW_SCALE_FACTOR }}
                source={image_url ? { uri: image_url } : IMAGES.Category}
                className="rounded-full"
                contentFit="contain"
            />
            <Text className="font-cairo-bold" ellipsizeMode="tail" numberOfLines={1}>{name}</Text>
        </Pressable>
    )
}