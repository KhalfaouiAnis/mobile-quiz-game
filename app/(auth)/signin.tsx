import AppButton from "@/core/components/ui/base/button/app-button";
import AppleButton from "@/core/components/ui/base/button/AppleButton";
import FacebookButton from "@/core/components/ui/base/button/FacebookButton";
import GoogleButton from "@/core/components/ui/base/button/GoogleButton";
import AppTextInput from "@/core/components/ui/base/text/app-text-field";
import AuthHeader from "@/core/components/ui/layout/auth-header";
import Container from "@/core/components/ui/shared/container";
import { OrSeparator } from "@/core/components/ui/shared/or-separator";
import ViewWrapper from "@/core/components/ui/shared/view-wrapper";
import { useSignIn } from "@/core/hooks/auth/use-auth";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function SignInScreen() {
    const { errors, handleSubmit, onSubmit, isSubmitting, control } = useSignIn();

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader />}>
            <ScrollView contentContainerClassName="flex-1 justify-center px-8 py-4 gap-y-6" showsVerticalScrollIndicator={false}>
                <ViewWrapper>
                    <Text className="text-center text-xl font-cairo-bold mb-4 text-primary-500">تسجيل الدخول</Text>
                    <View className="w-full">
                        <View className="flex-row gap-8">
                            <AppTextInput
                                name="email"
                                required
                                control={control}
                                error={errors.email?.message}
                                label="اسم المستخدم/البريد الالكتروني" />
                            <AppTextInput
                                name="password"
                                required
                                control={control}
                                error={errors.password?.message}
                                label="كلمة المرور" secureTextEntry />
                        </View>
                        <View className="w-full items-end">
                            <Link className="font-cairo" href="/forgot_password">هل نسيت كلمة المرور؟</Link>
                        </View>
                    </View>
                    <View className="w-1/5 mt-2">
                        <AppButton
                            title="دخول"
                            onPress={handleSubmit(onSubmit)}
                            loading={isSubmitting}
                        />
                    </View>
                    <View className="w-1/3">
                        <OrSeparator label="أو" />
                    </View>
                    <View className="flex-row gap-6 items-center justify-center">
                        <FacebookButton />
                        <AppleButton />
                        <GoogleButton />
                    </View>
                </ViewWrapper>
            </ScrollView>
        </Container>
    )
}