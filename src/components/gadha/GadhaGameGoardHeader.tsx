import { Text, View } from "react-native";
import { Image } from "expo-image"
import { boxShadow } from "@/src/utils/cn";
import { fontScale, scale, verticalScale } from "@/src/utils/dimensions";

export default function GadhaGameGoardHeader({ name, image_url }: { name: string, image_url?: string | null }) {
    return (
        <View
            className="relative items-center justify-center rounded-xl"
            style={{
                borderRadius: 10,
                width: scale(100),
                height: verticalScale(90),
                boxShadow:image_url ? boxShadow(5, 5, 0, 0, "rgba(000 000 000 / 1)").boxShadow : undefined,
            }}
        >
            {image_url ? (
                <Image
                    style={{
                        width: scale(80),
                        borderRadius: 10,
                        height: verticalScale(80),
                    }}
                    source={{ uri: image_url }}
                    className="absolute -z-10"
                    contentFit="cover"
                />
            ) : (
                <View style={{
                    borderWidth: 1,
                    borderColor: "#00A6DA",
                    overflow: 'hidden',
                    width: scale(90),
                    height: scale(90),
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text
                        style={{ fontSize: fontScale(18), color: "#00A6DA", lineHeight: 18 }}
                        className="font-cairo-bold text-center"
                        ellipsizeMode="tail"
                        numberOfLines={2}
                    >
                        {name ?? '?'}
                    </Text>
                </View>
            )}
        </View>
    )
}