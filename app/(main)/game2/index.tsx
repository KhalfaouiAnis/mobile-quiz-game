import CreateGame2Session from "@/core/components/forms/game2/host/create-session";
import StartGame2 from "@/core/components/forms/game2/host/start-game";
import Container from "@/core/components/ui/shared/container";
import { CreateGame2SessionInterface, CreateGame2SessionSchema } from "@/core/types/schema/game2";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Index() {
    const [currentStep, setCurrentStep] = useState(1);

    const methods = useForm<CreateGame2SessionInterface>({
        resolver: zodResolver(CreateGame2SessionSchema),
        defaultValues: {
            categoryIds: [],
            maxParticipants: 2,
        },
    });

    const renderCurrentStep = useCallback(() => {
        switch (currentStep) {
            case 1:
                return <CreateGame2Session setCurrentStep={setCurrentStep} />;
            case 2:
                return <StartGame2 setCurrentStep={setCurrentStep} />;
            default:
                return null;
        }
    }, [currentStep, setCurrentStep])

    return (
        <Container>
            <FormProvider {...methods}>
                {renderCurrentStep()}
            </FormProvider>
        </Container>
    );
}
