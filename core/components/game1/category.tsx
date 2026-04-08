import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { Text, View } from "react-native";
import { Image } from "expo-image"
import { IMAGES } from "@/core/constants/images";
import { boxShadow } from "@/core/utils/cn";
import { SubCategory } from "@/core/types";
import { scale, verticalScale } from "@/core/utils/sizes";

export function Game1BoardSubcategory({ name, image_url }: Partial<SubCategory>) {
    return (
        <View
            className="relative items-center justify-center rounded-xl"
            style={{
                borderRadius: 10,
                width: scale(100) * VIEW_SCALE_FACTOR,
                height: scale(100) * VIEW_SCALE_FACTOR,
                boxShadow: boxShadow(5, 5, 0, 0, "rgba(000 000 000 / 1)").button.boxShadow,
            }}
        >
            <Image
                style={{
                    borderRadius: 10,
                    width: scale(80) * VIEW_SCALE_FACTOR,
                    height: verticalScale(80) * VIEW_SCALE_FACTOR,
                }}
                source={image_url ? { uri: image_url } : IMAGES.FilmsCategory}
                className="absolute -z-10"
                contentFit="cover"
            />
            <View className="w-full h-full items-center justify-center absolute bg-black opacity-60 rounded-xl z-20">
                <Text numberOfLines={2} ellipsizeMode="tail" className="text-white text-center">{name}</Text>
            </View>
        </View>
    )
}