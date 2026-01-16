import Game1Category, { Game1Subcategory } from "@/core/components/game1/category";
import SubcategoryListHeader from "@/core/components/game1/subcategory-list-header";
import ArrowBack from "@/core/components/ui/layout/arrow-back";
import Container from "@/core/components/ui/shared/container";
import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { useCategoriesQuery } from "@/core/services/game1/category.queries";
import { useSubCategoriesQuery } from "@/core/services/game1/category/subcategory.queries";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";

function renderCategoryItem({ item }: { item: any }) {
    return <Game1Category name={item.name} category_id={item.category_id} />
}

function renderSubategoryItem({ item }: { item: any }) {
    return <Game1Subcategory name={item.name} category_id={item.category_id} sub_category_id={item.sub_category_id} />
}

export default function Index() {
    const { data, isLoading } = useCategoriesQuery()
    const { data: subcategories, isLoading: subcategoriesLoading } = useSubCategoriesQuery()

    return (
        <Container>
            <View
                style={boxShadow().button}
                className="bg-white mx-4 px-4 items-center relative py-1 rounded-2xl border-4 border-primary-500"
            >
                <Pressable className="absolute end-3 top-3">
                    <Ionicons name="menu" size={24} color="#00A6DA" />
                </Pressable>
                <Text className="font-cairo-bold text-2xl text-primary-500">اختر فئات  لعبتك</Text>
                {
                    isLoading ? <ActivityIndicator size="large" /> : (
                        <FlatList
                            horizontal
                            renderItem={renderCategoryItem}
                            data={data?.data.categories}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={cat => cat?.category_id?.toString()}
                            contentContainerClassName="gap-6 mx-2 border border-secondary-500 py-2 px-6"
                            ListEmptyComponent={<View className="items-center justify-center"><Text>No categories found</Text></View>}
                        />
                    )
                }
            </View>
            <View className="relative flex-1 w-full items-center bg-white rounded-t-3xl mt-2 pt-1 mb-0">
                <View className="absolute -start-4 top-2 z-20" pointerEvents="box-none">
                    <ArrowBack />
                </View>
                <View className="absolute -start-4 bottom-12 z-10">
                    <ArrowBack iconName="arrow-up" />
                </View>
                {subcategoriesLoading ? <ActivityIndicator size="large" /> : (
                    <FlatList
                        numColumns={6}
                        contentContainerClassName="px-4"
                        renderItem={renderSubategoryItem}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={subcategories?.data.subcategories}
                        columnWrapperStyle={{ gap: 14 * VIEW_SCALE_FACTOR }}
                        keyExtractor={cat => cat?.sub_category_id?.toString()}
                        contentContainerStyle={{ gap: 14 * VIEW_SCALE_FACTOR }}
                        ListHeaderComponent={<SubcategoryListHeader title="معلومات عامة" />}
                        ListEmptyComponent={<View className="items-center justify-center"><Text>No subcategories found</Text></View>}
                    />
                )}
            </View>
        </Container>
    );
}
