import { SectionList, NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import { useCallback, useMemo, useRef, useState } from "react";
import { SCREEN } from "@/src/utils/dimensions";
import { useFormContext, useWatch } from "react-hook-form";
import { GameGadhaSubcategory } from "@/src/types/game.gadha.types";
import GameSetup from "../GameSetup";
import EmptyList from "../../shared/empty-list";
import { buildSections, FOOTER_HEIGHT, getSectionListTotalHeight, ROW_HEIGHT, ScrollButton, SECTION_HEADER_HEIGHT, SectionHeader, styles, SubcategoryRow } from ".";

const DetailView = ({ selectedCategory, allCategories }: any) => {
    const [isAtBottom, setIsAtBottom] = useState(false);
    const { getValues, setValue } = useFormContext()
    const listRef = useRef<SectionList>(null);

    const orderedCategories = useMemo(
        () => [selectedCategory, ...allCategories.filter((c: any) => c.id !== selectedCategory.id)],
        [selectedCategory, allCategories],
    );

    const rawSelected = useWatch({ name: 'subcategoryIds', defaultValue: [] });

    const selectedSet = useMemo(() => new Set<GameGadhaSubcategory>(rawSelected), [rawSelected]);
    const sections = useMemo(() => buildSections(orderedCategories), [orderedCategories]);

    const totalHeight = useMemo(() => getSectionListTotalHeight(sections), [sections]);
    const showScrollButtons = totalHeight > SCREEN.height - 100;

    const handleSubPress = useCallback((sub: GameGadhaSubcategory) => {
        const current = getValues('subcategoryIds') ?? [];
        const alreadySelected = current.some((item: GameGadhaSubcategory) => item.id === sub.id)

        if (alreadySelected) {
            setValue('subcategoryIds', current.filter((item: GameGadhaSubcategory) => item.id !== sub.id), {
                shouldValidate: false,
            });
        } else if (current.length < 6) {
            setValue('subcategoryIds', [...current, sub], {
                shouldValidate: false,
            });
        }
    }, [getValues, setValue]);

    const renderItem = useCallback(
        ({ item: row }: any) => (
            <SubcategoryRow row={row} selectedSet={selectedSet} onSubPress={handleSubPress} />
        ),
        [handleSubPress, selectedSet],
    );

    const renderSectionHeader = useCallback(
        ({ section }: any) => <SectionHeader title={section.category.name} />,
        [],
    );

    const keyExtractor = useCallback(
        (row: any, index: any) => `row-${row[0]?.id ?? index}`,
        [],
    );

    const getItemLayout = useCallback(
        (_data: any, index: any) => {
            let offset = 0;
            let flatIndex = 0;

            for (const section of sections) {
                if (flatIndex === index) {
                    // This index is the section header
                    return { length: SECTION_HEADER_HEIGHT, offset, index };
                }
                offset += SECTION_HEADER_HEIGHT;
                flatIndex++;

                for (let r = 0; r < section.data.length; r++) {
                    if (flatIndex === index) {
                        return { length: ROW_HEIGHT, offset, index };
                    }
                    offset += ROW_HEIGHT;
                    flatIndex++;
                }
            }

            return { length: ROW_HEIGHT, offset, index };
        },
        [sections],
    );

    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { nativeEvent: { contentOffset, layoutMeasurement, contentSize } } = event;
        setIsAtBottom(contentOffset.y + layoutMeasurement.height >= contentSize.height - 20);
    }, []);

    const handleScrollToggle = useCallback(() => {
        if (isAtBottom) {
            listRef.current?.scrollToLocation({
                sectionIndex: 0,
                itemIndex: 0,
                viewOffset: 0,
                animated: true,
            });
        } else {
            const totalOffset = getSectionListTotalHeight(sections) + FOOTER_HEIGHT;
            listRef.current?.getScrollResponder()?.scrollTo({ x: 0, y: totalOffset, animated: true })
        }
    }, [isAtBottom, sections]);

    const renderFooter = useCallback(() => <View className="my-2 pb-2">
        <GameSetup />
    </View>, []);

    return (
        <View style={{ flex: 1, position: "relative", width: "100%", alignItems: "center", }}>
            <SectionList
                ref={listRef}
                windowSize={5}
                sections={sections}
                renderItem={renderItem}
                onScroll={handleScroll}
                initialNumToRender={14}
                maxToRenderPerBatch={14}
                scrollEventThrottle={16}
                keyExtractor={keyExtractor}
                removeClippedSubviews={false}
                getItemLayout={getItemLayout}
                updateCellsBatchingPeriod={50}
                ListEmptyComponent={EmptyList}
                ListFooterComponent={renderFooter}
                stickySectionHeadersEnabled={false}
                showsVerticalScrollIndicator={false}
                renderSectionHeader={renderSectionHeader}
                contentContainerStyle={styles.listContent}
            />
            {showScrollButtons && (
                <ScrollButton isAtBottom={isAtBottom} onPress={handleScrollToggle} />
            )}
        </View>
    );
};

export default DetailView