import { ActivityIndicator, FlatList, NativeScrollEvent, NativeSyntheticEvent, Pressable, Text, View } from "react-native";
import ArrowBack from "../ui/layout/arrow-back";
import SubcategoryListHeader from "./subcategory-list-header";
import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { useSubCategoriesQuery } from "@/core/services/game1/category/subcategory.queries";
import { CATEGORY_ITEM_HIGHT } from "./category";
import GameSetup from "./game-setup";
import EmptyList from "./empty-list";
import { useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Game1SetupValues } from "@/core/types/schema/game1";
import { SubCategory } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { Image } from "expo-image";
import { IMAGES } from "@/core/constants/images";

export default function SubcategoryListing({ activeCatId }: { activeCatId: number | null }) {
    const { control, setValue } = useFormContext<Game1SetupValues>()
    const { data, isLoading } = useSubCategoriesQuery(activeCatId)
    const listRef = useRef<FlatList | null>(null);
    const [isAtBottom, setIsAtBottom] = useState(false);

    const sub_category_ids = useWatch({ control, name: "sub_category_ids" })

    const toggleSubcategory = (id: number) => {
        const current = [...sub_category_ids];
        const index = current.indexOf(id);
        if (index > -1) {
            current.splice(index, 1);
        } else if (current.length < 6) {
            current.push(id);
        }
        setValue("sub_category_ids", current, { shouldValidate: true });
    };

    function renderSubategoryItem({ item }: { item: Partial<SubCategory> }) {
        return (
            <Pressable
                onPress={() => toggleSubcategory(item.id!)}
                className="px-2 rounded-2xl items-center justify-center border border-primary-500"
                style={[boxShadow(4, 4, 0, 0, "rgb(0 166 218 / 1)").button, { width: 100 * VIEW_SCALE_FACTOR, height: 72 * VIEW_SCALE_FACTOR }]}
            >
                <Image
                    style={{ width: 50 * VIEW_SCALE_FACTOR, height: 44 * VIEW_SCALE_FACTOR, borderRadius: 999 }}
                    source={item.image_url ? { uri: item.image_url } : IMAGES.FilmsCategory}
                    contentFit="cover"
                />
                <Text className="font-cairo-bold text-sm" ellipsizeMode="tail" numberOfLines={1}>{item.name}</Text>
            </Pressable>
        )
    }

    const toggleScroll = () => {
        if (isAtBottom) {
            listRef.current?.scrollToOffset({ offset: 0, animated: true });
        } else {
            listRef.current?.scrollToEnd({ animated: true });
        }
    };

    function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
        if (event.nativeEvent.contentOffset.y <= 0) {
            setIsAtBottom(false);
        }
    }


    return (
        <View className="relative flex-1 w-full items-center bg-white rounded-t-3xl mt-2 pt-1 px-4">
            <View className="absolute -start-4 top-2 z-20" pointerEvents="box-none">
                <ArrowBack />
            </View>
            <View className="absolute -start-4 bottom-12 z-10">
                <ArrowBack iconName={isAtBottom ? "arrow-up" : "arrow-down"} onPress={toggleScroll} />
            </View>
            {isLoading ? <ActivityIndicator size="large" /> : (
                <FlatList
                    ref={listRef}
                    numColumns={4}
                    onScroll={handleScroll}
                    data={data?.data.subcategories}
                    renderItem={renderSubategoryItem}
                    ListEmptyComponent={<EmptyList />}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={<GameSetup />}
                    showsHorizontalScrollIndicator={false}
                    onEndReached={() => setIsAtBottom(true)}
                    ListHeaderComponent={<SubcategoryListHeader activeCatId={activeCatId} />}
                    contentContainerClassName="pb-4 items-center px-2"
                    columnWrapperStyle={{ gap: 14 * VIEW_SCALE_FACTOR }}
                    keyExtractor={subCat => subCat.id!.toString()}
                    contentContainerStyle={{ gap: 14 * VIEW_SCALE_FACTOR }}
                    getItemLayout={(_, index) => ({ length: CATEGORY_ITEM_HIGHT, offset: CATEGORY_ITEM_HIGHT * index, index })}
                />
            )}
        </View>
    )
}