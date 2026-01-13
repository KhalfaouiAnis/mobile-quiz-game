import Container from "@/core/components/ui/shared/container";
import { boxShadow } from "@/core/utils/cn";
import {  Text, View } from "react-native";

export default function Subscription() {
    return (
        <Container backgroundColor="#FFF900"
            header={
                <View
                    className="items-center justify-center py-3 px-20 rounded-lg bg-secondary-500"
                    style={boxShadow(0, 0, 50, 0, "rgba(141,247,251,1)").button}>
                    <Text className="font-semibold">قدها</Text>
                </View>
            }
        >
            <View className="flex-1 items-center justify-center gap-y-8 bg-primary-500">
                <View
                    className="bg-white items-center justify-center py-3 px-20 rounded-lg border border-secondary-500"
                    style={boxShadow().button}>
                    <Text className="font-semibold">قدها</Text>
                </View>
            </View>
        </Container>
    );
}
