import AppButton from "@/core/components/ui/base/button/app-button";
import AppTextInput from "@/core/components/ui/base/text/app-text-field";
import AuthHeader from "@/core/components/ui/layout/auth-header";
import Container from "@/core/components/ui/shared/container";
import ViewWrapper from "@/core/components/ui/shared/view-wrapper";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function ForgotPasswordScreen() {
    const router = useRouter();

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader />}>
            <View className="flex-1 justify-center px-8 py-4 gap-y-6">
                <ViewWrapper>
                    <Text className="text-center text-xl font-cairo-bold text-primary-500">نسيت كلمة المرور</Text>
                    <Text className="text-center text-lg font-cairo-semibold my-4">الرجاء إدخال بريدك الإلكتروني لإعادة تعيين كلمة المرور</Text>
                    <View className="w-1/2 flex-1">
                        <AppTextInput label="البريد الالكتروني" placeholder="أدخل بريدك الإلكتروني" />
                    </View>
                    <View className="w-1/4 mt-6 flex-1">
                        <AppButton title="استرجاع" onPress={() => router.push("/otp_verification")} />
                    </View>
                </ViewWrapper>
            </View>
        </Container>
    )
}