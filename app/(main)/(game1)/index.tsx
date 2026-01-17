import CategoryListing from "@/core/components/game1/category-listing";
import SubcategoryListing from "@/core/components/game1/subcategory-listing";
import Container from "@/core/components/ui/shared/container";
import { useGameOneCategoryStore } from "@/core/store/category.store";

export default function Index() {
    const { selectedCategoryId } = useGameOneCategoryStore();

    return (
        <Container>
            <CategoryListing />
            {
                selectedCategoryId && (
                    <SubcategoryListing />
                )
            }
        </Container>
    );
}
