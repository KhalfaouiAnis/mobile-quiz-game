import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { COMMON_TEAM_NAMES } from "@/src/constants";
import Container from "@/src/components/shared/Container";
import SessionSetup from "@/src/components/gadha/SessionSetup";
import { CreateGadhaGameSession, CreateGadhaGameSessionSchema } from "@/src/types/game.gadha.types";

export default function Index() {
    const methods = useForm<CreateGadhaGameSession>({
        resolver: zodResolver(CreateGadhaGameSessionSchema),
        defaultValues: {
            teams: [{ name: COMMON_TEAM_NAMES[0].value }, { name: COMMON_TEAM_NAMES[1].value }],
            questionTimeLimit: 45,
            subcategoryIds: [],
        },
    });

    return (
        <Container>
            <FormProvider {...methods}>
                <SessionSetup />
            </FormProvider>
        </Container>
    );
}