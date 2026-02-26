import { useCategoriesQuery } from "@/core/services/game1/category/category.queries";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Dimensions, FlatList, Pressable, Text, View } from "react-native";
import EmptyList from "./empty-list";
import { Dispatch, SetStateAction } from "react";
import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { Image } from "expo-image";
import { Category } from "@/core/types";
import { IMAGES } from "@/core/constants/images";

export const CATEGORY_ITEM_HIGHT = 72 * VIEW_SCALE_FACTOR
export const SUBCATEGORY_ITEM_WIDTH = (Dimensions.get("window").width / 5) * VIEW_SCALE_FACTOR

export default function CategoryListing({ setActiveCatId }: { setActiveCatId: Dispatch<SetStateAction<number | null>> }) {
    const { data, isLoading } = useCategoriesQuery()

    function renderCategoryItem({ item }: { item: Partial<Category> }) {
        return (
            <Pressable
                onPress={() => setActiveCatId(item.id!)}
                className="px-2 rounded-2xl items-center justify-center border border-primary-500"
                style={[boxShadow(4, 4, 0, 0, "rgb(0 166 218 / 1)").button, { width: 100 * VIEW_SCALE_FACTOR, height: 72 * VIEW_SCALE_FACTOR }]}
            >
                <Image
                    style={{ width: 50 * VIEW_SCALE_FACTOR, height: 44 * VIEW_SCALE_FACTOR, borderRadius: 999 }}
                    // item.image_url ? { uri: item.image_url } :
                    source={ IMAGES.FilmsCategory}
                    contentFit="cover"
                />
                <Text className="font-cairo-bold text-sm" ellipsizeMode="tail" numberOfLines={1}>{item.name}</Text>
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
            <Text className="font-cairo-bold text-2xl text-primary-500">اختر فئات  لعبتك</Text>
            {
                isLoading ? <ActivityIndicator size="large" /> : (
                    <FlatList
                        horizontal
                        data={data?.data.categories}
                        renderItem={renderCategoryItem}
                        ListEmptyComponent={<EmptyList />}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={cat => cat?.id?.toString()}
                        contentContainerClassName="gap-6 mx-2 border border-secondary-500 py-2 px-6"
                        getItemLayout={(_, index) => ({ length: CATEGORY_ITEM_HIGHT, offset: CATEGORY_ITEM_HIGHT * index, index })}
                    />
                )
            }
        </View>
    )
}