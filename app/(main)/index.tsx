import { MainCard } from "@/core/components/ui/layout/main/main-card";
import { MainHeader } from "@/core/components/ui/layout/main/main-header";
import Container from "@/core/components/ui/shared/container";
import { OrSeparator } from "@/core/components/ui/shared/or-separator";
import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { IMAGES } from "@/core/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, Text, View } from "react-native";

export default function Index() {
    return (
        <Container header={<MainHeader />}>
            <ScrollView
                contentContainerClassName="flex-row mx-4 gap-2 pb-6"
                className="mt-28 gap-2 bg-primary-500"
                showsVerticalScrollIndicator={false}
                contentOffset={{ x: 0, y: 0 }}
                style={{ direction: "rtl" }}
            >
                <ScrollView
                    horizontal
                    style={{ direction: "rtl" }}
                    contentOffset={{ x: 0, y: 0 }}
                    contentContainerClassName="gap-4"
                    showsHorizontalScrollIndicator={false}
                >
                    <MainCard
                        title="عن لعبة  قدها"
                        infoPopup
                        content={
                            <View className="p-2">
                                <Text className="text-gray-500 font-cairo-medium">لعبة تمزج التحدي و المتعة مع الثقافة والمعرفة</Text>
                                <Text className="text-gray-500 font-cairo-medium">في جو لا يخلو من الحماس.. استمتع في هذه الأجواء مع 6 فئات من اختيارك</Text>
                                <Text className="text-gray-500 font-cairo-medium">جهز نفسك وخلنا نشوفك قدها..؟</Text>
                            </View>
                        }
                    />
                    <MainCard
                        title="وسائل المساعدة"
                        content={
                            <View className="p-2 items-center">
                                <OrSeparator label="دبل نقاطك" />
                                <Image source={IMAGES.HelpMeans} style={{ width: "70%", height: 100, objectFit: "contain" }} />
                                <Text className="text-gray-500 font-cairo-medium">ضاعف نقاط السؤال واستمر بالمنافسة</Text>
                            </View>
                        }
                    />
                    <MainCard
                        title="عن لعبة التحدي"
                        infoPopup
                        content={
                            <View className="p-2 items-start">
                                <Text className="text-gray-500 font-cairo-medium">لعبة تحدي تحتوي على 100 سؤال متنوع في مختلف المجالات.</Text>
                                <Text className="text-gray-500 font-cairo-medium">أجواء خيالية من المنافسة و التحدي و الإثارة..!</Text>
                                <Text className="text-gray-500 font-cairo-medium">اختر الاجابة الصحيحة و انتبه للوقت.</Text>
                            </View>
                        }
                    />
                    <MainCard
                        title="للاستفسار"
                        content={
                            <View className="p-2 items-center justify-center">
                                <Image source={IMAGES.TechSupport} style={{ width: 110 * VIEW_SCALE_FACTOR, height: 100 * VIEW_SCALE_FACTOR, objectFit: "contain" }} />
                                <View className="flex-row items-center gap-4">
                                    <Text className="text-gray-500 font-cairo-medium">يسعدنا تواصلك معنا</Text>
                                    <Ionicons name="call-outline" color="#F1190E" size={30} />
                                </View>
                            </View>
                        }
                    />
                </ScrollView>
            </ScrollView>
        </Container>
    );
}
