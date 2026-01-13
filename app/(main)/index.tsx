import { MainCard } from "@/core/components/ui/layout/main/main-card";
import { MainHeader } from "@/core/components/ui/layout/main/main-header";
import Container from "@/core/components/ui/shared/container";
import { Text, View } from "react-native";

export default function Index() {
    return (
        <Container header={<MainHeader />}>
            <View className="flex-1 flex-row items-center flex-wrap gap-2 bg-primary-500">
                <MainCard
                    title="an liaabet kadaha"
                    infoPopup
                    content={
                        <View className="p-2">
                            <Text></Text>
                            <Text></Text>
                            <Text></Text>
                        </View>
                    }
                />
                <MainCard
                    title="an liaabet kadaha"
                    infoPopup
                    content={
                        <View className="p-2">
                            <Text></Text>
                            <Text></Text>
                            <Text></Text>
                        </View>
                    }
                />
                <MainCard
                    title="an liaabet kadaha"
                    infoPopup
                    content={
                        <View className="p-2">
                            <Text></Text>
                            <Text></Text>
                            <Text></Text>
                        </View>
                    }
                />
                <MainCard
                    title="an liaabet kadaha"
                    infoPopup
                    content={
                        <View className="p-2">
                            <Text></Text>
                            <Text></Text>
                            <Text></Text>
                        </View>
                    }
                />
            </View>
        </Container>
    );
}
