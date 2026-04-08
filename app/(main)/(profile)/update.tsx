import AppButton from "@/core/components/ui/base/button/app-button";
import AppTextInput from "@/core/components/ui/base/text/app-text-field";
import AuthHeader from "@/core/components/ui/layout/auth-header";
import Container from "@/core/components/ui/shared/container";
import ViewWrapper from "@/core/components/ui/shared/view-wrapper";
import { useUpdatePassword } from "@/core/hooks/auth/use-auth";
import useAuthStore from "@/core/store/auth.store";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function UpdateProfileScreen() {
    const user = useAuthStore(state => state.user)
    const { errors, handleSubmit, onSubmit, isSubmitting, control } = useUpdatePassword({ email: user?.email });

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader showLogo={false} label="تعديل الملف الشخصي" />}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="items-center pb-10" className="px-20 pt-6">
                <ViewWrapper>
                    <View className="gap-y-8 px-28 mt-4">
                        <AppTextInput
                            required
                            name="email"
                            control={control}
                            error={errors.email?.message}
                            label="البريد الالكتروني" />
                        <AppTextInput
                            required
                            control={control}
                            name="currentPassword"
                            error={errors.currentPassword?.message}
                            label="كلمة المرور الحالية"
                            secureTextEntry />
                        <AppTextInput
                            required
                            control={control}
                            name="newPassword"
                            error={errors.newPassword?.message}
                            label="كلمة المرور الجديدة"
                            secureTextEntry />
                    </View>
                </ViewWrapper>
                <View className="w-1/4 -mt-2">
                    <AppButton
                        title="تاكيد"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}