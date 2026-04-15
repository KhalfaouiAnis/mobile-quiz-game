import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import Container from "@/src/components/shared/Container";
import CreateSession from "@/src/components/gadha/CreateSession";
import { CreateGadhaGameSession, CreateGadhaGameSessionSchema } from "@/src/types/game.gadha.types";
import { COMMON_TEAM_NAMES } from "@/src/constants";

export default function Index() {
    const methods = useForm<CreateGadhaGameSession>({
        resolver: zodResolver(CreateGadhaGameSessionSchema),
        defaultValues: {
            teams: [{ name: COMMON_TEAM_NAMES[0].value }, { name: COMMON_TEAM_NAMES[1].value }],
            subcategoryIds: [],
            questionTimeLimit: 45,
        },
    });

    return (
        <Container>
            <FormProvider {...methods}>
                <CreateSession />
            </FormProvider>
        </Container>
    );
}