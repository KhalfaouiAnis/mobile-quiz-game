import AppButton from "@/core/components/ui/base/button/app-button";
import AppTextInput from "@/core/components/ui/base/text/app-text-field";
import AuthHeader from "@/core/components/ui/layout/auth-header";
import Container from "@/core/components/ui/shared/container";
import ViewWrapper from "@/core/components/ui/shared/view-wrapper";
import { useUpdateProfile } from "@/core/hooks/auth/use-auth";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function UpdateProfileScreen() {
    const { errors, handleSubmit, onSubmit, isSubmitting, control } = useUpdateProfile();

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader showLogo={false} label="تعديل الملف الشخصي" />}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="items-center pb-10" className="px-20 pt-6">
                <ViewWrapper>
                    <View className="gap-y-8 px-28 mt-4">
                        <AppTextInput
                            name="email"
                            control={control}
                            error={errors.email?.message}
                            label="البريد الالكتروني" />
                        <AppTextInput
                            name="password"
                            control={control}
                            error={errors.password?.message}
                            label="كلمة المرور" secureTextEntry />
                        <AppTextInput
                            name="confirmPassword"
                            control={control}
                            error={errors.password?.message}
                            label="تأكيد كلمة المرور" secureTextEntry />
                    </View>
                </ViewWrapper>
                <View className="w-1/4 -mt-2">
                    <AppButton
                        title="تاكيد"
                        onPress={handleSubmit(onSubmit)}
                        loading={isSubmitting}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}