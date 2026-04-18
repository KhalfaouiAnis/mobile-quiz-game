import { FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import { useCallback, useRef, useState } from "react";
import { SCREEN } from "@/src/utils/dimensions";
import { ItemCard, NUM_COLUMNS, ROW_HEIGHT, ScrollButton, styles } from ".";
import EmptyList from "../../shared/empty-list";

const CategoriesListView = ({ categories, onCategoryPress }: any) => {
    const [isAtBottom, setIsAtBottom] = useState(false);
    const listRef = useRef<FlatList>(null);

    const totalRows = Math.ceil(categories.length / NUM_COLUMNS);
    const totalHeight = totalRows * ROW_HEIGHT;
    const showScrollButtons = totalHeight > SCREEN.height;

    const renderCategory = useCallback(
        ({ item }: any) => (
            <ItemCard item={item} onPress={onCategoryPress} isSelected={false} />
        ),
        [onCategoryPress],
    );

    const keyExtractor = useCallback((item: any) => item.id.toString(), []);

    const getItemLayout = useCallback(
        (_data: any, index: any) => ({
            length: ROW_HEIGHT,
            offset: ROW_HEIGHT * index,
            index,
        }),
        [],
    );

    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { nativeEvent: { contentOffset, layoutMeasurement, contentSize } } = event;
        setIsAtBottom(contentOffset.y + layoutMeasurement.height >= contentSize.height - 20);
    }, []);

    const handleScrollToggle = useCallback(() => {
        if (isAtBottom) {
            listRef.current?.scrollToOffset({ offset: 0, animated: true });
        } else {
            listRef.current?.scrollToEnd({ animated: true });
        }
    }, [isAtBottom]);

    return (
        <View style={styles.screen}>
            <FlatList
                ref={listRef}
                windowSize={5}
                data={categories}
                initialNumToRender={18}
                onScroll={handleScroll}
                maxToRenderPerBatch={12}
                numColumns={NUM_COLUMNS}
                scrollEventThrottle={16}
                renderItem={renderCategory}
                keyExtractor={keyExtractor}
                removeClippedSubviews={true}
                getItemLayout={getItemLayout}
                ListEmptyComponent={EmptyList}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContent}
            />
            {showScrollButtons && (
                <ScrollButton isAtBottom={isAtBottom} onPress={handleScrollToggle} />
            )}
        </View>
    );
};

export default CategoriesListView;