import { ActivityIndicator, FlatList, NativeScrollEvent, NativeSyntheticEvent, Pressable, Text, View } from "react-native";
import ArrowBack from "../ui/layout/arrow-back";
import SubcategoryListHeader from "./subcategory-list-header";
import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { useSubCategoriesQuery } from "@/core/services/game1/category/subcategory.queries";
import GameSetup from "./game-setup";
import EmptyList from "./empty-list";
import { useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { CreateGame1SessionRequest } from "@/core/types/schema/game1";
import { SubCategory } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { Image } from "expo-image";
import { IMAGES } from "@/core/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from "@/core/utils/sizes";

export default function SubcategoryListing({ activeCatId }: { activeCatId: number | null }) {
    const { control, setValue, getValues } = useFormContext<CreateGame1SessionRequest>()
    const { data, isLoading } = useSubCategoriesQuery(activeCatId)
    const listRef = useRef<FlatList | null>(null);
    const [isAtBottom, setIsAtBottom] = useState(false);

    const toggleSubcategory = (id: number) => {
        const sub_category_ids = getValues("sub_category_ids")
        const current = [...sub_category_ids];
        const index = current.indexOf(id);

        if (index > -1) {
            current.splice(index, 1);
        } else if (current.length < 6) {
            current.push(id);
        }

        setValue("sub_category_ids", current, { shouldValidate: true });
    };

    const sub_category_ids = useWatch({ control, name: "sub_category_ids" })

    function renderSubcategoryItem({ item }: { item: Partial<SubCategory> }) {
        return (
            <Pressable
                onPress={() => toggleSubcategory(item.id!)}
                className="relative px-2 rounded-2xl items-center justify-center"
                style={{
                    width: scale(120) * VIEW_SCALE_FACTOR,
                    height: verticalScale(90) * VIEW_SCALE_FACTOR,
                    boxShadow: boxShadow(4, 4, 0, 0, "rgb(0 166 218 / 1)").button.boxShadow
                }}
            >
                <Image
                    style={{ width: scale(50) * VIEW_SCALE_FACTOR, height: scale(50) * VIEW_SCALE_FACTOR, borderRadius: 999 }}
                    source={item.image_url ? { uri: item.image_url } : IMAGES.FilmsCategory}
                    contentFit="cover"
                />
                <Text
                    className="font-cairo-semibold px-1"
                    style={{ fontSize: moderateScale(18) }}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                >
                    {item.name}
                </Text>
                {sub_category_ids.indexOf(item.id!) > -1 && (
                    <View className="absolute top-2 right-0">
                        <Ionicons name="checkmark-circle-outline" size={24 * VIEW_SCALE_FACTOR} color={"green"} />
                    </View>
                )}
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
                    numColumns={6}
                    onScroll={handleScroll}
                    data={data?.data.subcategories}
                    renderItem={renderSubcategoryItem}
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
                    getItemLayout={(_, index) => ({ length: verticalScale(90), offset: verticalScale(90) * index, index })}
                />
            )}
        </View>
    )
}