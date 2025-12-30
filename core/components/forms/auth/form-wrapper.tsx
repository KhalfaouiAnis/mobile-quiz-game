import Container from "@/core/components/ui/shared/container";
import { PropsWithChildren } from "react";
import { ScrollView, Text, View } from "react-native";

export default function FormWrapper({ children, title }: PropsWithChildren<{ title: string }>) {
    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerClassName="items-center bg-white dark:bg-darkish">
                <View className="w-full pt-5 mt-5 bg-primary-500 rounded-t-[26px]">
                    <View className="items-center justify-center w-full">
                        <Text className="font-semibold text-xl">{title}</Text>
                    </View>
                    <View className="bg-white mt-5 rounded-t-[30px] dark:bg-darkish">
                        {children}
                    </View>
                </View>
            </ScrollView>
        </Container>
    )
}
