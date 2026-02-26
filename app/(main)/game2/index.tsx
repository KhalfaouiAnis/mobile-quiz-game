import CreateGame2Session from "@/core/components/forms/game2/host/create-session";
import StartGame2 from "@/core/components/forms/game2/host/start-game";
import Container from "@/core/components/ui/shared/container";
import { useCallback, useState } from "react";

export default function Index() {
    const [currentStep, setCurrentStep] = useState(1);

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
            {renderCurrentStep()}
        </Container>
    );
}
