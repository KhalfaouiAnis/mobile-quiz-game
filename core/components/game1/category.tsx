import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { Pressable, Text } from "react-native";
import { Image } from "expo-image"
import { IMAGES } from "@/core/constants/images";
import { boxShadow } from "@/core/utils/cn";
import { Category, SubCategory } from "@/core/types";
import { useGameOneCategoryStore } from "@/core/store/category.store";

export default function Game1Category({ name, image_url, category_id }: Partial<Category>) {
    const { setCategoryId } = useGameOneCategoryStore()
    function handlePress() { setCategoryId(category_id) }

    return (
        <Pressable
            onPress={handlePress}
            style={[boxShadow(4, 4, 0, 0, "rgb(0 166 218 / 1)").button]}
            className="py-1 px-2.5 rounded-2xl items-center border border-primary-500"
        >
            <Image
                style={{ width: 30 * VIEW_SCALE_FACTOR, height: 30 * VIEW_SCALE_FACTOR }}
                source={image_url ? { uri: image_url } : IMAGES.Category}
                className="rounded-full"
                contentFit="contain"
            />
            <Text className="font-cairo-bold">{name}</Text>
        </Pressable>
    )
}

export function Game1Subcategory({ name, image_url }: Partial<SubCategory>) {

    return (
        <Pressable
            style={[boxShadow(4, 4, 0, 0, "rgb(0 166 218 / 1)").button, { minWidth: 125 }]}
            className="py-1 px-2.5 rounded-2xl items-center border border-primary-500"
        >
            <Image
                style={{ width: 30 * VIEW_SCALE_FACTOR, height: 30 * VIEW_SCALE_FACTOR }}
                source={image_url ? { uri: image_url } : IMAGES.Category}
                className="rounded-full"
                contentFit="contain"
            />
            <Text className="font-cairo-bold">{name}</Text>
        </Pressable>
    )
}