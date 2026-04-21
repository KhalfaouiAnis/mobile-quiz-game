import { Pressable, StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import { Image } from "expo-image";
import { boxShadow } from "@/src/utils/cn";
import { IMAGES } from "@/src/constants/images";
import { fontScale, scale, verticalScale } from "@/src/utils/dimensions";
import { GameGadhaCategory, GameGadhaSubcategory } from "@/src/types/game.gadha.types";
import BackArrow from "../../shared/BackArrow";

export const NUM_COLUMNS = 6;
export const FOOTER_HEIGHT = verticalScale(180);
export const ITEM_GAP = 8;
export const CARD_WIDTH = scale(140)

export const CARD_HEIGHT = verticalScale(90) + 4 + 26 + 12; // avatar + gap + label(2lines) + vertical padding
export const ROW_HEIGHT = CARD_HEIGHT + ITEM_GAP;
export const SECTION_HEADER_HEIGHT = 54; // top margin(8) + box(~36) + bottom margin(10)

const chunkArray = (arr: GameGadhaSubcategory[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};

export const buildSections = (categories: GameGadhaCategory[]) =>
    categories.map((cat) => ({
        key: cat.id.toString(),
        category: cat,
        data: chunkArray(cat.subcategories, NUM_COLUMNS),
    }));

export const getSectionListTotalHeight = (sections: any[]) =>
    sections.reduce(
        (total, section) =>
            total + SECTION_HEADER_HEIGHT + section.data.length * ROW_HEIGHT,
        0,
    );

export const ScrollButton = ({ isAtBottom, onPress }: any) => (
    <View className="absolute -start-4 bottom-12 z-10">
        <BackArrow iconName={isAtBottom ? "arrow-up" : "arrow-down"} onPress={onPress} />
    </View>
);

interface ItemCardProps {
    item: GameGadhaSubcategory,
    onPress: (item: GameGadhaSubcategory) => void,
    isSelected?: boolean;
}

export const ItemCard = memo(({ item, onPress, isSelected }: ItemCardProps) => {
    return (
        <Pressable
            onPress={() => onPress(item)}
            className="relative px-1 rounded-2xl items-center justify-center"
            style={{
                width: scale(130),
                height: verticalScale(90),
                backgroundColor: isSelected ? "#00A6DA" : undefined,
                boxShadow: boxShadow(4, 4, 0, 0, "rgb(0 166 218 / 1)").button.boxShadow,
            }}
        >
            {item.image_url ? (
                <Image
                    style={{ width: scale(48), height: scale(48), borderRadius: 50 }}
                    source={item.image_url ? { uri: item.image_url } : IMAGES.FilmsCategory}
                    contentFit="cover"
                />
            ) : (
                <View style={[styles.avatarRing, { borderColor: isSelected ? "white" : BLUE }]}>
                    <Text
                        style={{ fontSize: fontScale(18), color: isSelected ? "white" : "#00A6DA" }}
                        className="font-cairo-semibold"
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >
                        {item.name?.charAt(0) ?? '?'}
                    </Text>
                </View>
            )}

            <Text
                className="font-cairo-semibold px-1 text-center"
                style={{ fontSize: fontScale(18) }}
                ellipsizeMode="tail"
                numberOfLines={1}
            >
                {item.name}
            </Text>
        </Pressable>
    )
}, (prev, next) =>
    prev.item.id === next.item.id &&
    prev.isSelected === next.isSelected);

interface ItemCardWrapperProps {
    item: GameGadhaSubcategory,
    onPress: (item: GameGadhaSubcategory) => void,
    selectedSet: Set<number>;
}

const SubcategoryCardWrapper = memo(
    ({ item, selectedSet, onPress }: ItemCardWrapperProps) => {
        return (
            <ItemCard
                item={item}
                onPress={onPress}
                isSelected={selectedSet.has(item.id)}
            />
        )
    },
    (prev, next) =>
        prev.item.id === next.item.id &&
        prev.selectedSet.has(prev.item.id) === next.selectedSet.has(next.item.id)
);

interface SubcategoryRowProps {
    row: GameGadhaSubcategory[];
    selectedSet: Set<number>,
    onSubPress: (item: GameGadhaSubcategory) => void,
}

export const SubcategoryRow = memo(({ row, selectedSet, onSubPress }: SubcategoryRowProps) => {
    return (
        <View style={styles.row}>
            {row.map((sub) => (
                <SubcategoryCardWrapper
                    item={sub}
                    key={sub.id}
                    onPress={onSubPress}
                    selectedSet={selectedSet}
                />
            ))}
            {/* Pad incomplete last row so cards keep correct width */}
            {row.length < NUM_COLUMNS &&
                Array.from({ length: NUM_COLUMNS - row.length }).map((_, i) => (
                    <View key={`pad-${i}`} style={styles.cardPad} />
                ))}
        </View>
    )
},
    (prev, next) =>
        prev.onSubPress === next.onSubPress &&
        prev.selectedSet === next.selectedSet
);

export const SectionHeader = memo(({ title }: { title: string }) => (
    <View
        className="py-1 border border-secondary-500 rounded-md self-center my-4"
        style={[boxShadow(4, 4, 4, 0, "rgb(000 000 000 / 0.50)").button, { width: scale(420), paddingHorizontal: scale(80) }]}
    >
        <Text
            style={{ fontSize: fontScale(24) }}
            className="text-center font-cairo-bold text-primary-500">{title}</Text>
    </View>
));

export const BLUE = '#00A6DA';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        position: "relative"
    },
    listContent: {
        paddingHorizontal: 4,
        gap: 12,
        marginBottom: 4,
        paddingBottom: 20,
    },
    // ── Row ──
    row: {
        flexDirection: 'row',
        gap: ITEM_GAP,
        marginBottom: ITEM_GAP,
    },
    columnWrapper: {
        gap: ITEM_GAP,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: BLUE,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 3,
    },
    cardPad: {
        width: CARD_WIDTH,
    },
    avatarRing: {
        borderWidth: 1,
        overflow: 'hidden',
        width: scale(48),
        height: scale(48),
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
});