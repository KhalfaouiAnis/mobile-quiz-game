import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Pressable, Text, View } from "react-native";
import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { Image } from "expo-image";
import { Category } from "@/core/types";
import { IMAGES } from "@/core/constants/images";
import { useFormContext, useWatch } from "react-hook-form";
import { CreateGame2SessionInterface } from "@/core/types/schema/game2";
import { useQueryClient } from "@tanstack/react-query";
import { CategoriesResponse } from "@/core/services/game2/category/category.service";
import { moderateScale } from "@/core/utils/sizes";

const CATEGORY_ITEM_HIGHT = 72 * VIEW_SCALE_FACTOR

export default function Game2SelectedCategories() {
    const { control } = useFormContext<CreateGame2SessionInterface>()
    const categoryIds = useWatch({ control, name: "categoryIds" });
    const queryClient = useQueryClient();
    const categories = queryClient.getQueryData<CategoriesResponse>(["game2__categories"])?.data.categories.filter(cat => new Set(categoryIds).has(cat.id))

    function renderCategoryItem({ item }: { item: Partial<Category> }) {
        return (
            <Pressable
                className="px-2 rounded-2xl items-center justify-center"
                style={[boxShadow(4, 4, 0, 0, "rgb(0 166 218 / 1)").button, { width: 80 * VIEW_SCALE_FACTOR, height: 72 * VIEW_SCALE_FACTOR }]}
            >
                <Image
                    style={{ width: 30 * VIEW_SCALE_FACTOR, height: 30 * VIEW_SCALE_FACTOR, borderRadius: 999 }}
                    // item.image_url ? { uri: item.image_url } :
                    source={IMAGES.FilmsCategory}
                    contentFit="cover"
                />
                <Text
                    className="font-cairo-semibold p-1"
                    style={{ fontSize: moderateScale(18) }}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                >
                    {item.name?.charAt(0).toUpperCase()}
                </Text>
            </Pressable>
        )
    }

    return (
        <View
            style={boxShadow().button}
            className="bg-white mx-4 mt-2 px-2 items-center relative py-1 rounded-2xl border-4 border-primary-500"
        >
            <Pressable className="absolute end-3 top-3">
                <Ionicons name="menu" size={24} color="#00A6DA" />
            </Pressable>
            <Text className="font-cairo-bold text-2xl text-primary-500">اختر فئات لعبتك</Text>
            <FlatList
                horizontal
                data={categories}
                renderItem={renderCategoryItem}
                showsHorizontalScrollIndicator={false}
                keyExtractor={cat => cat?.id?.toString()}
                contentContainerClassName="gap-8 mx-2 border border-secondary-500 py-1 px-6"
                getItemLayout={(_, index) => ({ length: CATEGORY_ITEM_HIGHT, offset: CATEGORY_ITEM_HIGHT * index, index })}
            />
        </View>
    )
}