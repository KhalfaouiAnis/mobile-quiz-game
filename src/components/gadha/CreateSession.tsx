import { ActivityIndicator, FlatList, NativeScrollEvent, NativeSyntheticEvent, Pressable, Text, View } from "react-native";
import { useFormContext } from "react-hook-form"
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Image } from "expo-image";
import { boxShadow } from "@/src/utils/cn";
import { IMAGES } from "@/src/constants/images";
import { moderateScale, scale, verticalScale } from "@/src/utils/sizes";
import BackArrow from "../shared/BackArrow";
import { useGadhaSubcategories } from "@/src/hooks/queries/gameGadha/useGadhaSubcategories";
import { CreateGadhaGameSession, GameGadhaCategory, GameGadhaSubcategory } from "@/src/types/game.gadha.types";
import GameSetup from "./GameSetup";
import EmptyList from "../shared/empty-list";

export default function CreateSession() {
    const { setValue } = useFormContext<CreateGadhaGameSession>()
    const { data, isLoading } = useGadhaSubcategories()
    const listRef = useRef<FlatList | null>(null);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [selectedSubs, setSelectedSubs] = useState<GameGadhaSubcategory[]>([])

    const toggleSelectSubcategory = (sub: GameGadhaSubcategory) => {
        const current = [...selectedSubs];
        const index = current.findIndex(item => item.id === sub.id)

        if (index > -1) {
            current.splice(index, 1);
        } else if (current.length < 6) {
            current.push(sub);
        }

        setSelectedSubs(current);
        setValue("subcategoryIds", current.map(sub => sub.id), { shouldValidate: true })
    };

    function renderSelectedSubCategory({ item }: { item: GameGadhaSubcategory }) {
        return (
            <Pressable
                onPress={() => toggleSelectSubcategory(item)}
                className="relative px-2 rounded-2xl items-center justify-center"
                style={{
                    width: scale(80),
                    height: verticalScale(60),
                    boxShadow: boxShadow(4, 4, 0, 0, "rgb(0 166 218 / 1)").button.boxShadow
                }}
            >
                <Feather name="x-circle" size={16} color="#F1190E" className="absolute top-0.5 start-0" />
                <Image
                    source={item.image_url ? { uri: item.image_url } : IMAGES.FilmsCategory}
                    style={{ width: scale(40), height: scale(40), borderRadius: 999 }}
                    contentFit="cover"
                />
                <Text className="font-cairo-bold text-sm" ellipsizeMode="tail" numberOfLines={1}>
                    {item.name?.charAt(0).toUpperCase()}
                </Text>
            </Pressable>
        )
    }

    function renderSubcategoryItem({ item }: { item: GameGadhaSubcategory }) {
        return (
            <Pressable
                onPress={() => toggleSelectSubcategory(item)}
                className="relative px-2 rounded-2xl items-center justify-center"
                style={{
                    width: scale(130),
                    height: verticalScale(90),
                    boxShadow: boxShadow(4, 4, 0, 0, "rgb(0 166 218 / 1)").button.boxShadow,
                    backgroundColor: selectedSubs.indexOf(item) > -1 ? "#00A6DA" : undefined
                }}
            >
                <Image
                    style={{ width: scale(50), height: scale(50), borderRadius: 999 }}
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

    function renderItem({ item }: { item: GameGadhaCategory }) {
        return (
            <View className="items-center gap-4">
                <View
                    className="py-1 border border-secondary-500 rounded-md"
                    style={[boxShadow(4, 4, 4, 0, "rgb(000 000 000 / 0.50)").button, { width: scale(420), paddingHorizontal: 80 }]}
                >
                    <Text className="text-center font-cairo-bold text-2xl text-primary-500">{item.name}</Text>
                </View>
                <FlatList
                    numColumns={6}
                    className="pb-3"
                    data={item.subcategories}
                    columnWrapperStyle={{ gap: 14 }}
                    renderItem={renderSubcategoryItem}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={subCat => subCat.id!.toString()}
                    contentContainerClassName="pb-4 items-center px-2"
                />
            </View>
        )
    }

    return (
        <View className="flex-1">
            <View
                style={{ boxShadow: boxShadow().button.boxShadow, width: scale(950) }}
                className="bg-white mt-2 px-2 self-center items-center relative py-1 rounded-2xl border-4 border-primary-500"
            >
                <View className="absolute -start-4 top-2 z-20" pointerEvents="box-none">
                    <BackArrow />
                </View>
                <Pressable className="absolute end-3 top-3">
                    <Ionicons name="menu" size={24} color="#00A6DA" />
                </Pressable>
                <Text className="font-cairo-bold text-2xl text-primary-500">اختر فئات  لعبتك</Text>
                <FlatList
                    horizontal
                    data={selectedSubs}
                    renderItem={renderSelectedSubCategory}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={sub => sub.id.toString()}
                    contentContainerClassName="gap-6 mx-2 border-secondary-500 py-2 px-6"
                    contentContainerStyle={{ borderWidth: selectedSubs.length > 0 ? 1 : 0 }}
                />
            </View>
            <View className="relative flex-1 items-center bg-white rounded-t-3xl mt-2 pt-1 px-4">
                <View className="absolute -start-4 bottom-12 z-10">
                    <BackArrow iconName={isAtBottom ? "arrow-up" : "arrow-down"} onPress={toggleScroll} />
                </View>
                {isLoading ? <ActivityIndicator size="large" /> : (
                    <FlatList
                        data={data}
                        ref={listRef}
                        renderItem={renderItem}
                        onScroll={handleScroll}
                        ListEmptyComponent={<EmptyList />}
                        ListFooterComponent={<GameSetup />}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        onEndReached={() => setIsAtBottom(true)}
                        keyExtractor={cat => cat.id!.toString()}
                        contentContainerClassName="items-center px-2 mt-2"
                        contentContainerStyle={{ gap: 20, paddingBottom: 80 }}
                    />
                )}
            </View>
        </View>
    )
}