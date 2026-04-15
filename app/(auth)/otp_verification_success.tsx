import AppButton from "@/src/components/shared/button/AppButton";
import AuthHeader from "@/src/components/layout/AuthHeader";
import Container from "@/src/components/shared/Container";
import ViewWrapper from "@/src/components/shared/ViewWrapper";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function OTPVerificationScreen() {
    const router = useRouter();

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader />}>
            <View className="flex-1 justify-center px-8 py-4 gap-y-6">
                <ViewWrapper>
                    <Text className="text-center text-2xl font-cairo-bold text-primary-500">إعادة تعيين كلمة المرور</Text>
                    <Text className="text-center text-lg font-cairo-bold mt-6">تم إعادة تعيين كلمة المرور الخاصة بك بنجاح.</Text>
                    <Text className="text-center text-lg font-cairo-bold mt-0.5">انقر فوق "تأكيد" لتعيين كلمة مرور جديدة</Text>
                    <View className="w-1/4 mt-8 flex-1">
                        <AppButton
                            title="تاكيد"
                            onPress={() => router.push("/account_verification_confirmation")} />
                    </View>
                </ViewWrapper>
            </View>
        </Container>
    )
}
