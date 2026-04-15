import { View } from "react-native";
import AuthHeader from "@/src/components/layout/AuthHeader";
import Container from "@/src/components/shared/Container";
import ViewWrapper from "@/src/components/shared/ViewWrapper";

export default function Chat() {
    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader showLogo={false} label="مركز المساعدة" />}>
            <View className="px-20 pt-12">
                <ViewWrapper>
                    <View className="gap-y-4 px-8">
                        
                    </View>
                </ViewWrapper>
            </View>
        </Container>
    );
}
