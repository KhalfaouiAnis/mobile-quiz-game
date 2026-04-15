import { MainHeader } from "@/src/components/layout/main/MainHeader";
import Container from "@/src/components/shared/Container";
import { IMAGES } from "@/src/constants/images";
import { FlatList, Image, View } from "react-native";

const data = [
    {
        id: "1",
        image: <Image source={IMAGES.Feature1} style={{ width: 220, height: 200, objectFit: "contain" }} />
    },
    {
        id: "2",
        image: <Image source={IMAGES.Feature2} style={{ width: 220, height: 200, objectFit: "contain" }} />
    },
    {
        id: "3",
        image: <Image source={IMAGES.Feature3} style={{ width: 220, height: 200, objectFit: "contain" }} />
    },
    {
        id: "4",
        image: <Image source={IMAGES.Feature4} style={{ width: 220, height: 200, objectFit: "contain" }} />
    },
]

export default function Index() {
    return (
        <Container header={<MainHeader />}>
            <View className="flex-1">
                <FlatList
                    horizontal
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => item.image}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginTop: 110 }}
                />
            </View>
        </Container>
    );
}
