import { queryClient } from "@/core/api/react-query";
import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { ApiResponse, CategoriesResponse } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { Text, View } from "react-native";

export default function SubcategoryListHeader({ activeCatId }: { activeCatId: number | null }) {
    const categories = queryClient.getQueryData<ApiResponse<CategoriesResponse>>(['game1__categories'])
    const selectedCategory = categories?.data?.categories.find(cat => cat.id === activeCatId);

    return (
        <View
            className="items-center py-1 border border-secondary-500 rounded-md"
            style={[boxShadow(4, 4, 4, 0, "rgb(000 000 000 / 0.75)").button, { width: 420 * VIEW_SCALE_FACTOR, paddingHorizontal: 80 * VIEW_SCALE_FACTOR }]}
        >
            <Text className="font-bagel-regular text-primary-500 text-2xl">{selectedCategory?.name}</Text>
        </View>
    )
}