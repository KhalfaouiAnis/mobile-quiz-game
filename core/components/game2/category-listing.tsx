import { ActivityIndicator, FlatList, NativeScrollEvent, NativeSyntheticEvent, Pressable, Text, View } from "react-native";
import ArrowBack from "../ui/layout/arrow-back";
import { VIEW_SCALE_FACTOR } from "@/core/constants";
import EmptyList from "./empty-list";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Category } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { Image } from "expo-image";
import { IMAGES } from "@/core/constants/images";
import { useGame2CategoriesQuery } from "@/core/services/game2/category/category.queries";
import { CreateGame2SessionInterface } from "@/core/types/schema/game2";

export default function Game2CategoryListing() {
    const { setValue, getValues } = useFormContext<CreateGame2SessionInterface>()
    const { data, isLoading } = useGame2CategoriesQuery()
    const [isAtBottom, setIsAtBottom] = useState(false);
    const listRef = useRef<FlatList | null>(null);

    const toggleCategory = (id: number) => {
        const categoryIds = getValues("categoryIds")
        const current = [...categoryIds];
        const index = current.indexOf(id);
        if (index > -1) {
            current.splice(index, 1);
        } else if (current.length < 10) {
            current.push(id);
        }
        setValue("categoryIds", current, { shouldValidate: true });
    };

    function renderCategoryItem({ item }: { item: Partial<Category> }) {
        return (
            <Pressable
                onPress={() => toggleCategory(item.id!)}
                className="relative px-2 rounded-2xl items-center justify-center"
                style={[boxShadow(4, 4, 0, 0, "rgb(0 166 218 / 1)").button, { width: 100 * VIEW_SCALE_FACTOR, height: 72 * VIEW_SCALE_FACTOR }]}
            >
                <Image
                    style={{ width: 50 * VIEW_SCALE_FACTOR, height: 44 * VIEW_SCALE_FACTOR, borderRadius: 999 }}
                    // source={item.image_url ? { uri: item.image_url } : IMAGES.FilmsCategory}
                    source={IMAGES.FilmsCategory}
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
                    numColumns={5}
                    onScroll={handleScroll}
                    data={data?.data.categories}
                    renderItem={renderCategoryItem}
                    ListEmptyComponent={<EmptyList />}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onEndReached={() => setIsAtBottom(true)}
                    keyExtractor={subCat => subCat.id!.toString()}
                    contentContainerClassName="pb-4 items-center px-2"
                    columnWrapperStyle={{ gap: 14 * VIEW_SCALE_FACTOR }}
                    contentContainerStyle={{ gap: 14 * VIEW_SCALE_FACTOR }}
                />
            )}
        </View>
    )
}