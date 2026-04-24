import AppButton from "@/src/components/shared/button/AppButton";
import AuthHeader from "@/src/components/layout/AuthHeader";
import Container from "@/src/components/shared/Container";
import ViewWrapper from "@/src/components/shared/ViewWrapper";
import AppTextInput from "@/src/components/shared/text/AppTextInput";

import { useSignup } from "@/src/hooks/mutations/useSignup";
import { type SignupFormData, signupSchema } from "@/src/schemas/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import { toast } from "sonner-native";
import { scale } from "@/src/utils/dimensions";

export default function SignupScreen() {
    const { t } = useTranslation()
    const signup = useSignup();

    const { control, handleSubmit } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: { username: '', email: '', password: '', phone: '' },
    });

    const onSubmit = (data: SignupFormData) => {
        signup.mutate(data, {
            onError: (err: any) => {
                const msg = err?.response?.data?.message ?? 'Sign up failed';
                toast.error(Array.isArray(msg) ? msg.join('\n') : msg)
            },
        });
    };

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader />}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="justify-center px-8 py-4 gap-y-6"
            >
                <ViewWrapper>
                    <Text className="text-center text-xl font-cairo-bold text-primary-500">{t("welcome.signup")}</Text>
                    <View className="flex-row gap-4 mt-6 w-4/5">
                        <AppTextInput
                            required
                            name="username"
                            control={control}
                            label={t("welcome.username")}
                        />
                        <AppTextInput
                            required
                            name="email"
                            control={control}
                            autoComplete="email"
                            label={t("welcome.email")}
                            keyboardType="email-address"
                        />
                    </View>
                    <View className="flex-row gap-4 mt-10 w-4/5">
                        <AppTextInput
                            phone
                            name="phone"
                            required={false}
                            control={control}
                            autoComplete="tel"
                            label={t("welcome.phone")}
                            keyboardType="number-pad"
                        />
                        <AppTextInput
                            required
                            name="password"
                            secureTextEntry
                            control={control}
                            label={t("welcome.password")}
                        />
                    </View>
                    <View className="mt-10">
                        <AppButton
                            width={scale(160)}
                            loading={signup.isPending}
                            title={t("welcome.signup")}
                            disabled={signup.isPending}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </ViewWrapper>
            </ScrollView>
        </Container>
    )
}