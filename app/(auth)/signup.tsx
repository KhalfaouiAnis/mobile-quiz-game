import AppButton from "@/core/components/ui/base/button/app-button";
import AppTextInput from "@/core/components/ui/base/text/app-text-field";
import AuthHeader from "@/core/components/ui/layout/auth-header";
import Container from "@/core/components/ui/shared/container";
import ViewWrapper from "@/core/components/ui/shared/view-wrapper";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function SignupScreen() {
    const router = useRouter();

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader />}>
            <View className="flex-1 justify-center px-8 py-4">
                <ViewWrapper>
                    <Text className="text-center text-xl font-cairo-bold text-primary-500">انشاء حساب</Text>
                    <View className="flex-row gap-4 mt-4">
                        <AppTextInput label="اسم المستخدم" />
                        <AppTextInput label="البريد الالكتروني" />
                    </View>
                    <View className="flex-row gap-4 mt-4">
                        <AppTextInput label="رقم الهاتف" keyboardType="number-pad" />
                        <AppTextInput label="كلمة المرور" secureTextEntry />
                    </View>
                    <View className="w-1/4 mt-2">
                        <AppButton title="أنشِئ حساب" onPress={() => router.push("/signin")} />
                    </View>
                </ViewWrapper>
            </View>
        </Container>
    )
}