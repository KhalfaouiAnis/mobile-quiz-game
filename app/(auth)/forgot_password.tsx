import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, ScrollView } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useVerifyOtp } from '@/src/hooks/mutations/useVerifyOtp';
import { useResetPassword } from '@/src/hooks/mutations/useResetPassword';
import { useForgotPassword } from '@/src/hooks/mutations/useForgotPassword';
import { forgotPasswordEmailSchema, verifyOtpSchema, resetPasswordSchema, type ForgotPasswordFormData, type VerifyOtpFormData, type ResetPasswordFormData } from '@/src/schemas/auth.schemas';
import Container from '@/src/components/shared/Container';
import AuthHeader from '@/src/components/layout/AuthHeader';
import ViewWrapper from '@/src/components/shared/ViewWrapper';
import AppTextInput from '@/src/components/shared/text/AppTextInput';
import AppButton from '@/src/components/shared/button/AppButton';
import OTPInput from '@/src/components/auth/OtpInput';
import { toast } from 'sonner-native';
import { useTranslation } from 'react-i18next';
import { scale } from '@/src/utils/dimensions';

type Step = 'email' | 'otp' | 'reset' | 'done';

export default function ForgotPasswordScreen() {
    const [step, setStep] = useState<Step>('email');
    const [resetToken, setResetToken] = useState('');
    const [email, setEmail] = useState('');
    const { t } = useTranslation()

    const forgotMutation = useForgotPassword();
    const verifyMutation = useVerifyOtp();
    const resetMutation = useResetPassword();

    // ── Step 1: email
    const emailForm = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordEmailSchema),
        defaultValues: { email: '' },
    });

    const onSubmitEmail = (data: ForgotPasswordFormData) => {
        forgotMutation.mutate(data.email, {
            onSuccess: () => {
                setEmail(data.email);
                setStep('otp');
            },
            onError: () => {
                // Always show success to prevent enumeration (mirrors backend behaviour)
                setEmail(data.email);
                setStep('otp');
            },
        });
    };

    // ── Step 2: OTP
    const otpForm = useForm<VerifyOtpFormData>({
        resolver: zodResolver(verifyOtpSchema),
        defaultValues: { otp: '' },
    });

    const onSubmitOtp = (data: VerifyOtpFormData) => {
        verifyMutation.mutate({ email, otp: data.otp }, {
            onSuccess: ({ resetToken: token }) => {
                setResetToken(token);
                setStep('reset');
            },
            onError: (err: any) => {
                const msg = err?.response?.data?.message ?? 'Invalid OTP';
                toast.error(msg)
            },
        });
    };

    // ── Step 3: new password
    const resetForm = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { newPassword: '', confirmPassword: '' },
    });

    const onSubmitReset = (data: ResetPasswordFormData) => {
        resetMutation.mutate({ resetToken, newPassword: data.newPassword }, {
            onSuccess: () => setStep('done'),
            onError: (err: any) => {
                const msg = err?.response?.data?.message ?? 'Reset failed';
                toast.error(msg)
            },
        });
    };

    // ── Step indicator
    const stepIndex = { email: 0, otp: 1, reset: 2, done: 3 }[step];
    const stepLabels = [t("welcome.forgot_password"), t("welcome.check_email"), t("welcome.reset_password")];
    const buttonLabels = [t("welcome.reset"), t("welcome.otp"), t("welcome.confirm")]

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader />}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="justify-center px-8 py-4 gap-y-6"
            >
                <ViewWrapper>
                    <Text className="text-center text-xl font-cairo-bold text-primary-500">{stepLabels[stepIndex] || ""}</Text>
                    {stepIndex === 0 && (<>
                        <Text numberOfLines={2} className="text-center text-sm font-cairo-bold my-4">
                            {t("welcome.please_enter_email")}
                        </Text>
                        <View
                            className="mt-6"
                            style={{ width: scale(320) }}
                        >
                            <AppTextInput
                                required
                                name="email"
                                autoComplete="email"
                                label={t("welcome.email")}
                                control={emailForm.control}
                                keyboardType="email-address"
                                placeholder={t("welcome.email")}
                            />
                        </View>
                        <View className="mt-10">
                            <AppButton
                                width={scale(160)}
                                title={buttonLabels[0]}
                                loading={forgotMutation.isPending}
                                disabled={forgotMutation.isPending || !!emailForm.formState.errors.email}
                                onPress={emailForm.handleSubmit(onSubmitEmail)}
                            />
                        </View>
                    </>
                    )}
                    {stepIndex === 1 && (<>
                        <Text numberOfLines={2} className="text-center text-lg font-cairo-bold my-4">
                            {t("welcome.enter_code", { email })}
                        </Text>
                        <OTPInput numberOfElements={6} onComplete={(code) => otpForm.setValue("otp", code)} />
                        <View className="mt-10">
                            <AppButton
                                width={scale(160)}
                                title={buttonLabels[1]}
                                loading={verifyMutation.isPending}
                                disabled={verifyMutation.isPending}
                                onPress={otpForm.handleSubmit(onSubmitOtp)}
                            />
                        </View>
                    </>
                    )}
                    {stepIndex === 2 && (<>
                        <View className="flex-row gap-4 mt-6">
                            <AppTextInput
                                required
                                secureTextEntry
                                name="newPassword"
                                control={resetForm.control}
                                label={t("welcome.new_pass")}
                                error={resetForm.formState.errors.newPassword?.message}
                            />
                            <AppTextInput
                                required
                                secureTextEntry
                                name="confirmPassword"
                                control={resetForm.control}
                                label={t("welcome.confirm_new_pass")}
                                error={resetForm.formState.errors.confirmPassword?.message}
                            />
                        </View>
                        <View className="mt-10">
                            <AppButton
                                width={scale(160)}
                                title={buttonLabels[2]}
                                loading={resetMutation.isPending}
                                disabled={resetMutation.isPending}
                                onPress={resetForm.handleSubmit(onSubmitReset)}
                            />
                        </View>
                    </>
                    )}
                </ViewWrapper>
            </ScrollView>
        </Container>
    )
}