import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import AppButton from "@/src/components/shared/button/AppButton";
import { IMAGES } from "@/src/constants/images";
import { boxShadow } from "@/src/utils/cn";

export default function PaymentSucceedModal({ onClose }: { onClose: () => void }) {
    return (
        <View className="flex-1 my-12 items-center justify-center bg-white p-3 rounded-3xl border-[10px] border-secondary-500"
            style={[boxShadow(0, 16, 32, 0, "rgb(000 000 000 / 0.23)").button,
            {
                width: 400,
                height: 280
            }
            ]}
        >
            <View className="p-8 bg-gray-50 items-center justify-center rounded-full">
                <Image
                    source={IMAGES.Verified}
                    style={{ width: 70, height: 70, objectFit: "contain" }}
                />
            </View>
            <Text className="mt-4 font-cairo text-xl">تم الدفع بنجاح</Text>
            <View className="w-1/4 mt-auto -mb-8">
                <AppButton
                    title="تاكيد"
                    onPress={onClose} />
            </View>
        </View>
    )
}