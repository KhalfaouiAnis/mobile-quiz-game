import AppButton from "@/core/components/ui/base/button/app-button";
import AuthHeader from "@/core/components/ui/layout/auth-header";
import Container from "@/core/components/ui/shared/container";
import OTPVerificationInput from "@/core/components/ui/base/text/otp-verification-input";
import ViewWrapper from "@/core/components/ui/shared/view-wrapper";
import { useOTP } from "@/core/hooks/auth/use-auth";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useState } from "react";

export default function OTPVerificationScreen() {
    const { email } = useLocalSearchParams<{ email: string }>()
    const { verifyOtp } = useOTP()
    const [otp, setOtp] = useState("");

    const handleVerifyOtp = async () => {
        verifyOtp(email, otp)
    }

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader />}>
            <View className="flex-1 justify-center px-8 py-4 gap-y-6">
                <ViewWrapper>
                    <Text className="text-center text-xl font-cairo-bold text-primary-500">
                        تحقق من بريدك الإلكتروني
                    </Text>
                    <Text numberOfLines={2} className="text-center text-lg font-cairo-bold my-4">
                        لقد أرسلنا رابط إعادة الضبط إلى ilhem..@gmail.com أدخل الرمز المكون من 5 أرقام المذكور في البريد الإلكتروني
                    </Text>
                    {/* <OTPVerificationInput numberOfElements={5} onComplete={async (otp) => await verifyOtp(email as string, otp)} /> */}
                    <OTPVerificationInput numberOfElements={5} onComplete={setOtp} />
                    <View className="w-1/4 mt-6 flex-1">
                        <AppButton title="رمز التحقق" onPress={handleVerifyOtp} />
                    </View>
                </ViewWrapper>
            </View>
        </Container>
    )
}