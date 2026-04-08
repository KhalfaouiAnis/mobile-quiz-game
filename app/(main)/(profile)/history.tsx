import AuthHeader from "@/core/components/ui/layout/auth-header";
import PieChartProgress from "@/core/components/ui/shared/pieChart-progress";
import CircularProgressIndicator from "@/core/components/ui/shared/circular-progress-indicator";
import Container from "@/core/components/ui/shared/container";
import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { useGame1SessionQueries } from "@/core/services/game1/session/session.queries";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function GameHistoryScreen() {
    const { useLastSession, useOverallProgress } = useGame1SessionQueries()
    const { data, isPending } = useLastSession()
    const { data: game1, isPending: game1Pending } = useOverallProgress()
    const router = useRouter()

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader showLogo={false} label="العابي السابقة" />}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="items-center pb-10" className="px-6 pt-6">
                <View className="flex-row items-center gap-6 bg-error py-2 ps-16 pe-4 rounded-2xl" style={boxShadow().button}>
                    <View>
                        <Text className="font-cairo-bold text-xl text-white">الاختبار الأخير</Text>
                        <Pressable
                            style={{ width: 100, height: 30 }}
                            disabled={!data?.sessionId || isPending}
                            onPress={() => router.navigate(`/(main)/game1/${data?.sessionId}`)}
                            className="bg-white items-center justify-center rounded-3xl mt-2 mb-1 disabled:bg-gray-200"
                        >
                            {isPending ? <ActivityIndicator size="small" color="#F1190E" /> : <Text className="font-cairo-bold text-error">مواصلة اللعب</Text>}
                        </Pressable>
                    </View>
                    <PieChartProgress percentage={isPending ? 0 : (data?.completionPercentage || 0)} />
                </View>
                <View className="flex-1 self-start"><Text className="font-cairo-bold text-2xl text-white">ألعاب غير مكتملة</Text></View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="flex-row gap-8 mt-1"
                >
                    <View
                        style={boxShadow().button}
                        className="flex-row items-center gap-2 bg-white px-4 py-12 rounded-xl">
                        <View className="p-2 py-3 border border-secondary-500 items-center bg-white rounded-full">
                            <Text className="font-cairo-bold">قدها</Text>
                        </View>
                        <Text className="font-cairo-semibold">
                            الاسئلة المتبقية :
                            {game1Pending ? <ActivityIndicator size="small" /> : game1?.remaining}
                        </Text>
                        <CircularProgressIndicator value={game1Pending ? 0 : (game1?.progress || 0)} />
                    </View>
                    <View
                        style={boxShadow().button}
                        className="flex-row items-center gap-2 bg-white px-4 py-12 rounded-xl">
                        <View className="p-2 py-3 border border-secondary-500 items-center bg-white rounded-full">
                            <Text className="font-cairo-bold">التحدي</Text>
                        </View>
                        <Text className="font-cairo-semibold">الاسئلة المتبقية : 20</Text>
                        <CircularProgressIndicator value={85} />
                    </View>
                    <View
                        style={boxShadow().button}
                        className="flex-row items-center gap-2 bg-white px-4 py-12 rounded-xl">
                        <View className="flex-row gap-1 p-2 py-2 border border-secondary-500 items-center bg-white rounded-full">
                            <Text className="font-cairo-bold">اللعبة</Text>
                            <Text className="font-bagel-regular">3</Text>
                        </View>
                        <Text className="font-cairo-semibold">الاسئلة المتبقية : 20</Text>
                        <CircularProgressIndicator value={85} />
                    </View>
                </ScrollView>
                <View className="mt-6 flex-row items-center gap-3">
                    <Pressable className="items-center border-2 border-secondary-500 p-1" style={{ width: 110 * VIEW_SCALE_FACTOR }}>
                        <View className="p-2.5 items-center bg-secondary-500 rounded-full">
                            <Ionicons name="home" size={24} color="#00A6DA" />
                        </View>
                        <Text className="font-cairo text-white">الصفحة الرئيسية</Text>
                    </Pressable>
                    <Pressable className="items-center border-2 border-secondary-500 p-1" style={{ width: 110 * VIEW_SCALE_FACTOR }}>
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