import { MainCard } from "@/core/components/ui/layout/main/main-card";
import { MainHeader } from "@/core/components/ui/layout/main/main-header";
import Container from "@/core/components/ui/shared/container";
import { OrSeparator } from "@/core/components/ui/shared/or-separator";
import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { IMAGES } from "@/core/constants/images";
import { useSocketSetup } from "@/core/hooks/game2/use-socket-setup";
import { moderateScale, scale, verticalScale } from "@/core/utils/sizes";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, Text, View } from "react-native";

const data = [
    {
        id: "1", title: "عن لعبة قدها", infoPopup: true, content: <View className="p-2">
            <Text
                style={{ fontSize: moderateScale(12) }}
                className="text-gray-500 font-cairo-medium ">لعبة تمزج التحدي و المتعة مع الثقافة والمعرفة</Text>
            <Text
                style={{ fontSize: moderateScale(12) }}
                className="text-gray-500 font-cairo-medium">في جو لا يخلو من الحماس.. استمتع في هذه الأجواء مع 6 فئات من اختيارك</Text>
            <Text
                style={{ fontSize: moderateScale(12) }}
                className="text-gray-500 font-cairo-medium">جهز نفسك وخلنا نشوفك قدها..؟</Text>
        </View>
    },
    {
        id: "2", title: "وسائل المساعدة", infoPopup: false, content: <View className="p-2 items-center">
            <OrSeparator label="دبل نقاطك" />
            <Image source={IMAGES.HelpMeans} style={{ width: "70%", height: verticalScale(100), objectFit: "contain" }} />
            <Text
                style={{ fontSize: moderateScale(12) }}
                className="text-gray-500 font-cairo-medium">ضاعف نقاط السؤال واستمر بالمنافسة</Text>
        </View>
    },
    {
        id: "3", title: "عن لعبة التحدي", infoPopup: true, content: <View className="p-2 items-start">
            <Text
                style={{ fontSize: moderateScale(12) }}
                className="text-gray-500 font-cairo-medium">لعبة تحدي تحتوي على 100 سؤال متنوع في مختلف المجالات.</Text>
            <Text
                style={{ fontSize: moderateScale(12) }}
                className="text-gray-500 font-cairo-medium">أجواء خيالية من المنافسة و التحدي و الإثارة..!</Text>
            <Text
                style={{ fontSize: moderateScale(12) }}
                className="text-gray-500 font-cairo-medium">اختر الاجابة الصحيحة و انتبه للوقت.</Text>
        </View>
    },
    {
        id: "4", title: "للاستفسار", infoPopup: false, content: <View className="p-2 items-center justify-center">
            <Image source={IMAGES.TechSupport} style={{ width: 110 * VIEW_SCALE_FACTOR, height: 100 * VIEW_SCALE_FACTOR, objectFit: "contain" }} />
            <View className="flex-row items-center gap-4">
                <Text
                    style={{ fontSize: moderateScale(12) }}
                    className="text-gray-500 font-cairo-medium"
                >يسعدنا تواصلك معنا
                </Text>
                <Ionicons name="call-outline" color="#F1190E" size={moderateScale(30)} />
            </View>
        </View>
    }
]

export default function Index() {
    useSocketSetup()

    return (
        <Container
            header={<MainHeader />}>
            <FlatList
                horizontal
                data={data}
                keyExtractor={(item) => item.id}
                contentContainerClassName="gap-4"
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <MainCard {...item} />}
                contentContainerStyle={{ paddingHorizontal: 8, marginTop: 80 }}
            />
        </Container>
    );
}
