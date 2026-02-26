import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { IMAGES } from "@/core/constants/images";
import { boxShadow } from "@/core/utils/cn";
import { Image, Text, View } from "react-native";
import AppButton from "../../base/button/app-button";
import { router } from "expo-router";

export default function PaymentSucceedModal() {
    return (
        <View className="flex-1 my-12 items-center justify-center bg-white p-3 rounded-3xl border-[10px] border-secondary-500"
            style={[boxShadow(0, 16, 32, 0, "rgb(000 000 000 / 0.23)").button,
            {
                width: 400 * VIEW_SCALE_FACTOR,
                height: 280 * VIEW_SCALE_FACTOR
            }
            ]}
        >
            <View className="p-8 bg-gray-50 items-center justify-center rounded-full">
                <Image
                    source={IMAGES.Verified}
                    style={{ width: 70 * VIEW_SCALE_FACTOR, height: 70 * VIEW_SCALE_FACTOR, objectFit: "contain" }}
                />
            </View>
            <Text className="mt-4 font-cairo text-xl">تم الدفع بنجاح</Text>
            <View className="w-1/4 mt-auto -mb-8">
                <AppButton
                    title="تاكيد"
                    onPress={() => router.replace("/(main)/(profile)")} />
            </View>
        </View>
    )
}