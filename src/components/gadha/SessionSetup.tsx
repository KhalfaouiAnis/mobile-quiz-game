import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { useFormContext, useWatch } from "react-hook-form"
import { Feather, Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { Image } from "expo-image";
import { boxShadow } from "@/src/utils/cn";
import { IMAGES } from "@/src/constants/images";
import { fontScale, scale, verticalScale } from "@/src/utils/dimensions";
import BackArrow from "../shared/BackArrow";
import { useGadhaSubcategories } from "@/src/hooks/queries/gameGadha/useGadhaSubcategories";
import { CreateGadhaGameSession, GameGadhaSubcategory } from "@/src/types/game.gadha.types";
import DetailView from "./listing/CategoriesDetailView";
import CategoriesListView from "./listing/CategoriesListView";

export default function SessionSetup() {
    const rawSelected: GameGadhaSubcategory[] = useWatch({ name: 'subcategoryIds', defaultValue: [] });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { setValue, getValues } = useFormContext<CreateGadhaGameSession>()

    const { data, isLoading } = useGadhaSubcategories()

    const handleCategoryPress = useCallback((cat: any) => setSelectedCategory(cat), []);
    const handleBack = useCallback(() => setSelectedCategory(null), []);

    const handleDeleteSelected = useCallback((sub: GameGadhaSubcategory) => {
        const current: GameGadhaSubcategory[] = getValues("subcategoryIds") ?? []

        setValue('subcategoryIds', current.filter((item: GameGadhaSubcategory) => item.id !== sub.id), {
            shouldValidate: false,
        });
    }, [setValue]);

    function renderSelectedSubCategory({ item }: { item: GameGadhaSubcategory }) {
        return (
            <Pressable
                onPress={() => handleDeleteSelected(item)}
                className="relative px-2 rounded-2xl items-center justify-center"
                style={{
                    width: scale(70),
                    height: verticalScale(60),
                    boxShadow: boxShadow(4, 4, 0, 0, "rgb(0 166 218 / 1)").boxShadow
                }}
            >
                <Feather name="x-circle" size={scale(14)} color="#F1190E" className="absolute top-0.5 start-0" />
                <Image
                    source={item.image_url ? { uri: item.image_url } : IMAGES.FilmsCategory}
                    style={{ width: scale(30), height: scale(30), borderRadius: 999 }}
                    contentFit="cover"
                />
                <Text className="font-cairo-bold" style={{ fontSize: fontScale(15) }} ellipsizeMode="tail" numberOfLines={1}>
                    {item.name?.charAt(0).toUpperCase()}
                </Text>
            </Pressable>
        )
    }

    if (isLoading) return (
        <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" />
        </View>
    )

    return (
        <View className="flex-1">
            <View
                style={{ boxShadow: boxShadow().boxShadow, width: scale(950) }}
                className="bg-white mt-2 px-2 self-center items-center relative py-1 rounded-2xl border-4 border-primary-500"
            >
                <View className="absolute -start-4 top-2 z-20" pointerEvents="box-none">
                    <BackArrow onPress={selectedCategory ? handleBack : undefined} />
                </View>
                <Pressable className="absolute end-3 top-3">
                    <Ionicons name="menu" size={24} color="#00A6DA" />
                </Pressable>
                <Text
                    style={{ fontSize: fontScale(24) }}
                    className="font-cairo-bold text-primary-500">اختر فئات  لعبتك</Text>
                <FlatList
                    horizontal
                    data={rawSelected}
                    renderItem={renderSelectedSubCategory}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={sub => sub.id.toString()}
                    contentContainerClassName="gap-6 mx-2 border-secondary-500 py-2 px-6"
                    contentContainerStyle={{ borderWidth: rawSelected.length > 0 ? 1 : 0 }}
                />
            </View>
            <View className="flex-1 items-center bg-white rounded-t-3xl mt-2">
                {
                    selectedCategory ? <DetailView
                        allCategories={data}
                        selectedCategory={selectedCategory}
                    /> : <CategoriesListView
                        categories={data}
                        onCategoryPress={handleCategoryPress}
                    />
                }

            </View>
        </View>
    );
}
