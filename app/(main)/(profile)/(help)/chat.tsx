import AuthHeader from "@/core/components/ui/layout/auth-header";
import Container from "@/core/components/ui/shared/container";
import ViewWrapper from "@/core/components/ui/shared/view-wrapper";
import { View } from "react-native";

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
