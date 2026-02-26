import { useGameOneCategoryStore } from "@/core/store/category.store"
import { Pressable, Text, View } from "react-native"
import { Dispatch, SetStateAction } from "react"
import CategoryListing from "@/core/components/game1/category-listing"
import SubcategoryListing from "@/core/components/game1/subcategory-listing"

export default function CreateGame2Session({ setCurrentStep }: { setCurrentStep: Dispatch<SetStateAction<number>> }) {
    const { selectedCategoryId } = useGameOneCategoryStore()

    return (
        <>
            <CategoryListing />
            <View className="items-center py-6">
                <Pressable className="text-2xl" onPress={() => setCurrentStep(2)}>
                    <Text>ابدا اللعب</Text>
                </Pressable>
            </View>
            {
                selectedCategoryId && (<SubcategoryListing />)
            }
        </>
    )
}