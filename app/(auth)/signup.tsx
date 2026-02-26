import AppButton from "@/core/components/ui/base/button/app-button";
import AppTextInput from "@/core/components/ui/base/text/app-text-field";
import AuthHeader from "@/core/components/ui/layout/auth-header";
import Container from "@/core/components/ui/shared/container";
import ViewWrapper from "@/core/components/ui/shared/view-wrapper";
import { useSignUp } from "@/core/hooks/auth/use-auth";
import { Text, View } from "react-native";

export default function SignupScreen() {
    const { errors, handleSubmit, onSubmit, isSubmitting, control } = useSignUp();

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader />}>
            <View className="flex-1 justify-center px-8 py-4">
                <ViewWrapper>
                    <Text className="text-center text-xl font-cairo-bold text-primary-500">انشاء حساب</Text>
                    <View className="flex-row gap-4 mt-6">
                        <AppTextInput
                            name="username"
                            control={control}
                            required
                            error={errors.username?.message}
                            label="اسم المستخدم" />
                        <AppTextInput
                            name="email"
                            control={control}
                            required
                            keyboardType="email-address"
                            error={errors.email?.message}
                            label="البريد الالكتروني"
                             />
                    </View>
                    <View className="flex-row gap-4 mt-6">
                        <AppTextInput
                            phone
                            name="phone"
                            control={control}
                            label="رقم الهاتف" 
                            keyboardType="number-pad" 
                            error={errors.phone?.message}
                            />
                        <AppTextInput
                            name="password"
                            control={control}
                            required
                            error={errors.password?.message}
                            label="كلمة المرور" secureTextEntry />
                    </View>
                    <View className="w-1/4 mt-6">
                        <AppButton
                            title="أنشِئ حساب"
                            onPress={handleSubmit(onSubmit)}
                            loading={isSubmitting}
                        />
                    </View>
                </ViewWrapper>
            </View>
        </Container>
    )
}