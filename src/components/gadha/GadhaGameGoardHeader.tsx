import { Text, View } from "react-native";
import { Image } from "expo-image"
import { IMAGES } from "@/src/constants/images";
import { boxShadow } from "@/src/utils/cn";
import { scale, verticalScale } from "@/src/utils/dimensions";

export default function GadhaGameGoardHeader({ name, image_url }: { name: string, image_url?: string | null }) {
    return (
        <View
            className="relative items-center justify-center rounded-xl"
            style={{
                borderRadius: 10,
                width: scale(100),
                height: verticalScale(90),
                boxShadow: boxShadow(5, 5, 0, 0, "rgba(000 000 000 / 1)").button.boxShadow,
            }}
        >
            <Image
                style={{
                    borderRadius: 10,
                    width: scale(80),
                    height: verticalScale(80),
                }}
                source={image_url ? { uri: image_url } : IMAGES.FilmsCategory}
                className="absolute -z-10"
                contentFit="cover"
            />
            {/* <View className="w-full h-full items-center justify-center absolute rounded-xl z-20">
                <Text numberOfLines={2} ellipsizeMode="tail" className="text-white text-center">{name}</Text>
            </View> */}
        </View>
    )
}