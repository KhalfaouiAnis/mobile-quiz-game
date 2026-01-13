import AppButton from "@/core/components/ui/base/button/app-button";
import AppTextInput from "@/core/components/ui/base/text/app-text-field";
import AuthHeader from "@/core/components/ui/layout/auth-header";
import Container from "@/core/components/ui/shared/container";
import ViewWrapper from "@/core/components/ui/shared/view-wrapper";
import { useResetPassword } from "@/core/hooks/auth/use-auth";
import { Text, View } from "react-native";

export default function NewPasswordScreen() {
    const { errors, handleSubmit, onSubmit, isSubmitting, control } = useResetPassword();

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader />}>
            <View className="flex-1 justify-center px-8 py-4">
                <ViewWrapper>
                    <Text className="text-center text-xl font-cairo-bold text-primary-500">إعادة تعيين كلمة المرور</Text>
                    <View className="w-1/2 h-16 mt-6">
                        <AppTextInput
                            name="email"
                            control={control}
                            error={errors.email?.message}
                            required
                            label="البريد الالكتروني"
                            placeholder="أدخل بريدك الإلكتروني" />
                    </View>
                    <View className="flex-row gap-4 mt-6">
                        <AppTextInput
                            name="password"
                            control={control}
                            error={errors.password?.message}
                            required
                            label="كلمة المرور الجديدة" secureTextEntry />
                        <AppTextInput
                            name="confirmPassword"
                            control={control}
                            error={errors.confirmPassword?.message}
                            required
                            label="تأكيد كلمة المرور" secureTextEntry />
                    </View>
                    <View className="w-1/4 mt-6">
                        <AppButton
                            loading={isSubmitting}
                            title="تاكيد"
                            onPress={handleSubmit(onSubmit)} />
                    </View>
                </ViewWrapper>
            </View>
        </Container>
    )
}