import { ActivityIndicator, FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import ArrowBack from "../ui/layout/arrow-back";
import SubcategoryListHeader from "./subcategory-list-header";
import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { useSubCategoriesQuery } from "@/core/services/game1/category/subcategory.queries";
import { CATEGORY_ITEM_HIGHT, Game1Subcategory } from "./category";
import TeamActions from "./team-actions";
import EmptyList from "./empty-list";
import { useCategoriesQuery } from "@/core/services/game1/category/category.queries";
import { useRef, useState } from "react";
import { SubCategory } from "@/core/types";

const DATA = [
    {
        "sub_category_id": 22,
        "category_id": 8,
        "name": "Algebra",
        "image_url": "https://example.com/images/algebra.jpg",
        "order": 1,
        "is_active": true,
        "created_at": "2026-01-15T15:19:42.467Z",
        "updated_at": "2026-01-15T15:19:42.467Z",
        "deleted_at": null,
        "is_deleted": false,
        "category": {
            "category_id": 8,
            "name": "Mathematics",
            "image_url": "https://example.com/images/mathematics.jpg",
            "order": 8,
            "is_active": true,
            "created_at": "2026-01-15T15:19:42.423Z",
            "updated_at": "2026-01-15T15:19:42.423Z",
            "deleted_at": null,
            "is_deleted": false
        }
    },
    {
        "sub_category_id": 5,
        "category_id": 5,
        "name": "World Geography",
        "image_url": "https://example.com/images/world-geography.jpg",
        "order": 1,
        "is_active": true,
        "created_at": "2026-01-15T15:19:42.466Z",
        "updated_at": "2026-01-15T15:19:42.466Z",
        "deleted_at": null,
        "is_deleted": false,
        "category": {
            "category_id": 5,
            "name": "General Knowledge",
            "image_url": "https://example.com/images/general-knowledge.jpg",
            "order": 1,
            "is_active": true,
            "created_at": "2026-01-15T15:19:42.423Z",
            "updated_at": "2026-01-15T15:19:42.423Z",
            "deleted_at": null,
            "is_deleted": false
        }
    },
    {
        "sub_category_id": 17,
        "category_id": 4,
        "name": "Classic Literature",
        "image_url": "https://example.com/images/classic-literature.jpg",
        "order": 1,
        "is_active": true,
        "created_at": "2026-01-15T15:19:42.467Z",
        "updated_at": "2026-01-15T15:19:42.467Z",
        "deleted_at": null,
        "is_deleted": false,
        "category": {
            "category_id": 4,
            "name": "Literature",
            "image_url": "https://example.com/images/literature.jpg",
            "order": 7,
            "is_active": true,
            "created_at": "2026-01-15T15:19:42.423Z",
            "updated_at": "2026-01-15T15:19:42.423Z",
            "deleted_at": null,
            "is_deleted": false
        }
    },
    {
        "sub_category_id": 12,
        "category_id": 6,
        "name": "Countries & Capitals",
        "image_url": "https://example.com/images/countries-capitals.jpg",
        "order": 1,
        "is_active": true,
        "created_at": "2026-01-15T15:19:42.467Z",
        "updated_at": "2026-01-15T15:19:42.467Z",
        "deleted_at": null,
        "is_deleted": false,
        "category": {
            "category_id": 6,
            "name": "Geography",
            "image_url": "https://example.com/images/geography.jpg",
            "order": 6,
            "is_active": true,
            "created_at": "2026-01-15T15:19:42.423Z",
            "updated_at": "2026-01-15T15:19:42.423Z",
            "deleted_at": null,
            "is_deleted": false
        }
    },
    {
        "sub_category_id": 24,
        "category_id": 1,
        "name": "Football",
        "image_url": "https://example.com/images/football.jpg",
        "order": 1,
        "is_active": true,
        "created_at": "2026-01-15T15:19:42.467Z",
        "updated_at": "2026-01-15T15:19:42.467Z",
        "deleted_at": null,
        "is_deleted": false,
        "category": {
            "category_id": 1,
            "name": "Sports",
            "image_url": "https://example.com/images/sports.jpg",
            "order": 4,
            "is_active": true,
            "created_at": "2026-01-15T15:19:42.423Z",
            "updated_at": "2026-01-15T15:19:42.423Z",
            "deleted_at": null,
            "is_deleted": false
        }
    },
    {
        "sub_category_id": 7,
        "category_id": 3,
        "name": "Ancient History",
        "image_url": "https://example.com/images/ancient-history.jpg",
        "order": 1,
        "is_active": true,
        "created_at": "2026-01-15T15:19:42.466Z",
        "updated_at": "2026-01-15T15:19:42.466Z",
        "deleted_at": null,
        "is_deleted": false,
        "category": {
            "category_id": 3,
            "name": "History",
            "image_url": "https://example.com/images/history.jpg",
            "order": 3,
            "is_active": true,
            "created_at": "2026-01-15T15:19:42.423Z",
            "updated_at": "2026-01-15T15:19:42.423Z",
            "deleted_at": null,
            "is_deleted": false
        }
    },
    {
        "sub_category_id": 2,
        "category_id": 2,
        "name": "Physics",
        "image_url": "https://example.com/images/physics.jpg",
        "order": 1,
        "is_active": true,
        "created_at": "2026-01-15T15:19:42.466Z",
        "updated_at": "2026-01-15T15:19:42.466Z",
        "deleted_at": null,
        "is_deleted": false,
        "category": {
            "category_id": 2,
            "name": "Science & Technology",
            "image_url": "https://example.com/images/science-tech.jpg",
            "order": 2,
            "is_active": true,
            "created_at": "2026-01-15T15:19:42.423Z",
            "updated_at": "2026-01-15T15:19:42.423Z",
            "deleted_at": null,
            "is_deleted": false
        }
    },
    {
        "sub_category_id": 15,
        "category_id": 7,
        "name": "Movies",
        "image_url": "https://example.com/images/movies.jpg",
        "order": 1,
        "is_active": true,
        "created_at": "2026-01-15T15:19:42.467Z",
        "updated_at": "2026-01-15T15:19:42.467Z",
        "deleted_at": null,
        "is_deleted": false,
        "category": {
            "category_id": 7,
            "name": "Entertainment",
            "image_url": "https://example.com/images/entertainment.jpg",
            "order": 5,
            "is_active": true,
            "created_at": "2026-01-15T15:19:42.423Z",
            "updated_at": "2026-01-15T15:19:42.423Z",
            "deleted_at": null,
            "is_deleted": false
        }
    },
    {
        "sub_category_id": 6,
        "category_id": 5,
        "name": "Famous People",
        "image_url": "https://example.com/images/famous-people.jpg",
        "order": 2,
        "is_active": true,
        "created_at": "2026-01-15T15:19:42.466Z",
        "updated_at": "2026-01-15T15:19:42.466Z",
        "deleted_at": null,
        "is_deleted": false,
        "category": {
            "category_id": 5,
            "name": "General Knowledge",
            "image_url": "https://example.com/images/general-knowledge.jpg",
            "order": 1,
            "is_active": true,
            "created_at": "2026-01-15T15:19:42.423Z",
            "updated_at": "2026-01-15T15:19:42.423Z",
            "deleted_at": null,
            "is_deleted": false
        }
    },
    {
        "sub_category_id": 14,
        "category_id": 7,
        "name": "Music",
        "image_url": "https://example.com/images/music.jpg",
        "order": 2,
        "is_active": true,
        "created_at": "2026-01-15T15:19:42.467Z",
        "updated_at": "2026-01-15T15:19:42.467Z",
        "deleted_at": null,
        "is_deleted": false,
        "category": {
            "category_id": 7,
            "name": "Entertainment",
            "image_url": "https://example.com/images/entertainment.jpg",
            "order": 5,
            "is_active": true,
            "created_at": "2026-01-15T15:19:42.423Z",
            "updated_at": "2026-01-15T15:19:42.423Z",
            "deleted_at": null,
            "is_deleted": false
        }
    }
]


function renderSubategoryItem({ item }: { item: any }) {
    return <Game1Subcategory name={item.name} category_id={item.category_id} sub_category_id={item.sub_category_id} />
}

export default function SubcategoryListing() {
    const { data, isLoading } = useSubCategoriesQuery()
    const listRef = useRef<FlatList | null>(null);
    const [isAtBottom, setIsAtBottom] = useState(false);

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
                    ListFooterComponent={<TeamActions />}
                    showsHorizontalScrollIndicator={false}
                    onEndReached={() => setIsAtBottom(true)}
                    ListHeaderComponent={<SubcategoryListHeader />}
                    contentContainerClassName="pb-4 items-center px-2"
                    columnWrapperStyle={{ gap: 14 * VIEW_SCALE_FACTOR }}
                    keyExtractor={cat => cat?.sub_category_id?.toString()}
                    contentContainerStyle={{ gap: 14 * VIEW_SCALE_FACTOR }}
                    getItemLayout={(_, index) => ({ length: CATEGORY_ITEM_HIGHT, offset: CATEGORY_ITEM_HIGHT * index, index })}
                />
            )}
        </View>
    )
}