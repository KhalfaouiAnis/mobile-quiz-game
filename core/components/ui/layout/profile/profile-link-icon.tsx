import { boxShadow } from "@/core/utils/cn";
import { PropsWithChildren, ReactNode } from "react";
import { View } from "react-native";

interface Props {
    children: ReactNode,
    bgColor?: string
}

export default function ProfileLinkIcon({ children, bgColor = "bg-secondary-500" }: Props) {
    return (
        <View className={`${bgColor} rounded-lg p-1`} style={boxShadow(4, 5, 4, 0).button}>
            {children}
        </View>
    )
}