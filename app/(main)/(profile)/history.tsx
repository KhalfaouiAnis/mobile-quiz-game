import AuthHeader from "@/core/components/ui/layout/auth-header";
import Container from "@/core/components/ui/shared/container";
import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function GameHistoryScreen() {

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader showLogo={false} label="العابي السابقة" />}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="items-center pb-10" className="px-6 pt-6">
                <View className="flex-row items-center gap-6 bg-error py-2 ps-16 pe-4 rounded-2xl" style={boxShadow().button}>
                    <View>
                        <Text className="font-cairo-bold text-xl text-white">الاختبار الأخير</Text>
                        <Pressable className="bg-white px-1 py-2 rounded-3xl mt-2 mb-1">
                            <Text className="font-cairo-bold text-error">مواصلة اللعب</Text>
                        </Pressable>
                    </View>
                    <View className="p-2 items-center bg-white rounded-full">
                        <Text className="font-cairo-bold">65%</Text>
                    </View>
                </View>
                <View className="flex-1 self-start"><Text className="font-cairo-bold text-2xl text-white">ألعاب غير مكتملة</Text></View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerClassName="flex-row gap-8 mt-1">
                    <View
                        style={boxShadow().button}
                        className="flex-row items-center gap-2 bg-white px-4 py-12 rounded-xl">
                        <View className="p-2 py-3 border border-secondary-500 items-center bg-white rounded-full">
                            <Text className="font-cairo-bold">قدها</Text>
                        </View>
                        <Text className="font-cairo-semibold">الاسئلة المتبقية : 20</Text>
                        <View className="p-2 items-center bg-gray-100 rounded-full">
                            <Text className="font-cairo-bold">65%</Text>
                        </View>
                    </View>
                    <View
                        style={boxShadow().button}
                        className="flex-row items-center gap-2 bg-white px-4 py-12 rounded-xl">
                        <View className="p-2 py-3 border border-secondary-500 items-center bg-white rounded-full">
                            <Text className="font-cairo-bold">التحدي</Text>
                        </View>
                        <Text className="font-cairo-semibold">الاسئلة المتبقية : 20</Text>
                        <View className="p-2 items-center bg-gray-100 rounded-full">
                            <Text className="font-cairo-bold">65%</Text>
                        </View>
                    </View>
                    <View
                        style={boxShadow().button}
                        className="flex-row items-center gap-2 bg-white px-4 py-12 rounded-xl">
                        <View className="flex-row gap-1 p-2 py-2 border border-secondary-500 items-center bg-white rounded-full">
                            <Text className="font-cairo-bold">اللعبة</Text>
                            <Text className="font-bagel-regular">3</Text>
                        </View>
                        <Text className="font-cairo-semibold">الاسئلة المتبقية : 20</Text>
                        <View className="p-2 items-center bg-gray-100 rounded-full">
                            <Text className="font-cairo-bold">65%</Text>
                        </View>
                    </View>
                </ScrollView>
                <View className="mt-6 flex-row items-center gap-3">
                    <Pressable className="items-center border-2 border-secondary-500 p-1" style={{width: 110 * VIEW_SCALE_FACTOR}}>
                        <View className="p-2.5 items-center bg-secondary-500 rounded-full">
                            <Ionicons name="home" size={24} color="#00A6DA" />
                        </View>
                        <Text className="font-cairo text-white">الصفحة الرئيسية</Text>
                    </Pressable>
                    <Pressable className="items-center border-2 border-secondary-500 p-1" style={{width: 110 * VIEW_SCALE_FACTOR}}>
                        <View className="p-2.5 items-center bg-secondary-500 rounded-full">
                            <Ionicons name="settings" size={24} color="#00A6DA" />
                        </View>
                        <Text className="font-cairo text-white">لوحة الاعبين</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </Container>
    )
}