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
    const { handleSubmit, onSubmit, isSubmitting, control } = useSignIn();

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader />}>
            <ScrollView contentContainerClassName="flex-1 justify-center px-8 py-4 gap-y-6" showsVerticalScrollIndicator={false}>
                <ViewWrapper>
                    <Text className="text-center text-xl font-cairo-bold mb-4 text-primary-500">تسجيل الدخول</Text>
                    <View className="w-full">
                        <View className="flex-row gap-8">
                            <AppTextInput
                                required
                                name="username"
                                control={control}
                                label="اسم المستخدم/البريد الالكتروني"
                            />
                            <AppTextInput
                                required
                                secureTextEntry
                                name="password"
                                control={control}
                                label="كلمة المرور"
                            />
                        </View>
                        <View className="w-full items-end">
                            <Link className="font-cairo" href="/forgot_password">هل نسيت كلمة المرور؟</Link>
                        </View>
                    </View>
                    <View className="w-1/5 mt-2">
                        <AppButton
                            title="دخول"
                            loading={isSubmitting}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                    <View className="w-1/3 my-1">
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