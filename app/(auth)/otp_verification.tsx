import AppButton from "@/core/components/ui/base/button/app-button";
import AuthHeader from "@/core/components/ui/layout/auth-header";
import Container from "@/core/components/ui/shared/container";
import OTPVerificationInput from "@/core/components/ui/base/text/otp-verification-input";
import ViewWrapper from "@/core/components/ui/shared/view-wrapper";
import { useOTP } from "@/core/hooks/auth/use-auth";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function OTPVerificationScreen() {
    const { email } = useLocalSearchParams()
    const { verifyOtp } = useOTP()
    const router = useRouter();

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader />}>
            <View className="flex-1 justify-center px-8 py-4 gap-y-6">
                <ViewWrapper>
                    <Text className="text-center text-xl font-cairo-bold text-primary-500">
                        تحقق من بريدك الإلكتروني
                    </Text>
                    <Text numberOfLines={2} className="text-center text-lg font-cairo-semibold my-4">
                        لقد أرسلنا رابط إعادة الضبط إلى ilhem..@gmail.com أدخل الرمز المكون من 5 أرقام المذكور في البريد الإلكتروني
                    </Text>
                    {/* <OTPVerificationInput numberOfElements={5} onComplete={async (otp) => await verifyOtp(email as string, otp)} /> */}
                    <OTPVerificationInput numberOfElements={5} onComplete={console.log} />
                    <View className="w-1/4 mt-6 flex-1">
                        <AppButton title="رمز التحقق" onPress={() => router.push("/otp_verification_success")} />
                    </View>
                </ViewWrapper>
            </View>
        </Container>
    )
}