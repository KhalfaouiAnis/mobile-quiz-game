import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { toast } from "sonner-native";
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AppButton from "@/src/components/shared/button/AppButton";
import AuthHeader from "@/src/components/layout/AuthHeader";
import Container from "@/src/components/shared/Container";
import ViewWrapper from "@/src/components/shared/ViewWrapper";

import AppleButton from "@/src/components/shared/button/AppleButton";
import FacebookButton from "@/src/components/shared/button/FacebookButton";
import GoogleButton from "@/src/components/shared/button/GoogleButton";
import AppTextInput from "@/src/components/shared/text/AppTextInput";
import { OrSeparator } from "@/src/components/shared/OrSeparator";

import { loginSchema, type LoginFormData } from '@/src/schemas/auth.schemas';
import { useLogin } from '@/src/hooks/mutations/useLogin';

export default function SignInScreen() {
    const login = useLogin();
    const { t } = useTranslation()

    const { control, handleSubmit } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { identifier: '', password: '' },
    });

    const onSubmit = (data: LoginFormData) => {
        login.mutate(data, {
            onError: (err: any) => {
                const msg = err?.response?.data?.message ?? t("errors.login_failed");
                toast.error(Array.isArray(msg) ? msg.join('\n') : msg)
            },
        });
    };

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader />}>
            <ScrollView
                contentContainerClassName="justify-center px-8 py-4 gap-y-6" showsVerticalScrollIndicator={false}>
                <ViewWrapper>
                    <Text className="text-center text-xl font-cairo-bold mb-4 text-primary-500">{t("welcome.signin")}</Text>
                    <View className="w-full">
                        <View className="flex-row gap-8">
                            <AppTextInput
                                required
                                name="identifier"
                                control={control}
                                keyboardType="email-address"
                                label={t("welcome.email_username")}
                            />
                            <AppTextInput
                                required
                                secureTextEntry
                                name="password"
                                control={control}
                                label={t("welcome.password")}
                            />
                        </View>
                        <View className="w-full items-end">
                            <Link className="font-cairo" href="/forgot_password">{t("welcome.forgot_pass")}</Link>
                        </View>
                    </View>
                    <View className="w-1/5 mt-2">
                        <AppButton
                            title={t("welcome.enter")}
                            loading={login.isPending}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>

                    <View className="w-1/3 my-1"><OrSeparator label={t("welcome.or")} /></View>

                    {/* <OAuthButtons onError={(msg) => Alert.alert('Error', msg)} /> */}

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
