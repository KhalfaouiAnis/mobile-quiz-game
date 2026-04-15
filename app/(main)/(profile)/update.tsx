import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AppButton from "@/src/components/shared/button/AppButton";
import AuthHeader from "@/src/components/layout/AuthHeader";
import Container from "@/src/components/shared/Container";
import ViewWrapper from "@/src/components/shared/ViewWrapper";
import AppTextInput from "@/src/components/shared/text/AppTextInput";
import { useUpdateProfile } from "@/src/hooks/user/useUpdateProfile";

export default function UpdateProfileScreen() {
    const { errors, handleSubmit, onSubmit, isSubmitting, control } = useUpdateProfile();

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
                            name="newPassword"
                            error={errors.newPassword?.message}
                            label="كلمة المرور الجديدة"
                            secureTextEntry />
                        <AppTextInput
                            required
                            control={control}
                            name="confirmPassword"
                            error={errors.confirmPassword?.message}
                            label="تاكيد كلمة المرور الجديدة"
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