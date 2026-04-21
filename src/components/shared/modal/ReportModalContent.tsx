import { boxShadow } from "@/src/utils/cn";
import { Pressable, Text, TextInput, View } from "react-native";
import AppButton from "../button/AppButton";
import { fontScale, scale, verticalScale } from "@/src/utils/dimensions";

export default function ReportingModal() {
    return (
        <View
            className="items-center justify-center px-10 pt-10 bg-white rounded-xl"
            style={boxShadow(0, 16, 32, 0, "rgb(000 000 000 / 0.23)").button}
        >
            <Text
                style={{ fontSize: fontScale(16) }}
                className="font-cairo-bold text-primary-500">يُرجى تقديم تفاصيل أكثر حول المشكلة المتعلقة</Text>
            <View className="flex-row items-center gap-4 mt-10">
                <AppButton
                    semiRounded
                    title="السؤال"
                    onPress={() => { }}
                />
                <AppButton
                    semiRounded
                    title="الاجابة"
                    onPress={() => { }}
                />
            </View>
            <View
                style={{
                    boxShadow: boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button.boxShadow, padding: 2,
                    borderRadius: 20, height: verticalScale(100), width: scale(400), marginTop: 6,
                }}
            >
                <TextInput
                    multiline
                    numberOfLines={4}
                    placeholder="السؤال / الاجابة خطا لانه..."
                    className="text-black font-cairo-medium"
                    style={{ writingDirection: "rtl", textAlign: "right", flex: 1, verticalAlign: "top" }}
                />
            </View>
            <Pressable>
                <View
                    style={{
                        boxShadow: boxShadow().button.boxShadow,
                        height: verticalScale(48),
                        width: scale(140),
                        marginVertical: 12,
                    }}
                    className="bg-secondary-500 rounded-xl rounded-t-2xl items-center justify-center border border-error disabled:bg-gray-200"
                >
                    <Text className='font-cairo-bold text-lg'>تبليغ</Text>
                </View>
            </Pressable>
        </View>
    )
}