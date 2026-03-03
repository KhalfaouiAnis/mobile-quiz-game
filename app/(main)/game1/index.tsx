import CategoryListing from "@/core/components/game1/category-listing";
import SubcategoryListing from "@/core/components/game1/subcategory-listing";
import Container from "@/core/components/ui/shared/container";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateGame1SessionSchema, CreateGame1SessionRequest } from "@/core/types/schema/game1";
import { useState } from "react";

export default function Index() {
    const [activeCatId, setActiveCatId] = useState<number | null>(null);

    const methods = useForm<CreateGame1SessionRequest>({
        resolver: zodResolver(CreateGame1SessionSchema),
        defaultValues: {
            sub_category_ids: [],
            teams: [{ name: "", score: 0 }, { name: "", score: 0 }],
        },
    });

    return (
        <Container>
            <FormProvider {...methods}>
                <CategoryListing setActiveCatId={setActiveCatId} />
                {activeCatId && (<SubcategoryListing activeCatId={activeCatId} />)}
            </FormProvider>
        </Container>
    );
}
