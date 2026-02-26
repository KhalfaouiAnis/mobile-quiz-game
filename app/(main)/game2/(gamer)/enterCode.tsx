import OTPVerificationInput from "@/core/components/ui/base/text/otp-verification-input";
import { VIEW_SCALE_FACTOR } from "@/core/constants";
import AppButton from "@/core/components/ui/base/button/app-button";
import AuthHeader from "@/core/components/ui/layout/auth-header";
import Container from "@/core/components/ui/shared/container";
import { Text, View } from "react-native";
import { boxShadow } from "@/core/utils/cn";
import QRCodeScanner from "@/core/components/game2/qrcode-scanner";

export default function GameSessionCode() {

    return (
        <Container header={<AuthHeader label="انضم إلى اللعبة" showLogo={false} />}>
            <View
                style={boxShadow(4, 4, 0, 1, "rgba(000 000 000 /1)").button}
                className="items-center justify-center flex-1 w-2/3 bg-white px-8 gap-y-10 mx-auto my-4 rounded-2xl border-secondary-500 border"
            >
                <View className="items-center flex-row">
                    <Text className="text-primary-500 text-2xl font-cairo-bold">ادخل رمز  Pin:</Text>
                    <OTPVerificationInput numberOfElements={6} onComplete={() => { }} gameCode />
                </View>
                <View style={{ width: 130 * VIEW_SCALE_FACTOR }}>
                    <AppButton
                        title="انضم الينا"
                        onPress={() => { }}
                    />
                </View>
                <QRCodeScanner />
            </View>
        </Container>
    );
}
