import { useCategoriesQuery } from "@/core/services/game1/category/category.queries";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import Game1Category, { CATEGORY_ITEM_HIGHT } from "./category";
import EmptyList from "./empty-list";

function renderCategoryItem({ item }: { item: any }) {
    return <Game1Category name={item.name} category_id={item.category_id} />
}

export default function CategoryListing() {
    const { data, isLoading } = useCategoriesQuery()

    return (
        <View
            style={boxShadow().button}
            className="bg-white mx-4 mt-2 px-4 items-center relative py-1 rounded-2xl border-4 border-primary-500"
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
                        keyExtractor={cat => cat?.category_id?.toString()}
                        contentContainerClassName="gap-6 mx-2 border border-secondary-500 py-2 px-6"
                        getItemLayout={(_, index) => ({ length: CATEGORY_ITEM_HIGHT, offset: CATEGORY_ITEM_HIGHT * index, index })}
                    />
                )
            }
        </View>
    )
}