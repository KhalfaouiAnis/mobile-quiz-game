import { boxShadow } from "@/core/utils/cn";
import { ReactNode } from "react";
import { ScrollView, View } from "react-native";

export default function ViewWrapper({ children }: { children: ReactNode }) {
    return (
        <ScrollView style={boxShadow().button}
            className="relative bg-white border border-secondary-500 py-6 px-8 rounded-3xl"
            contentContainerClassName="items-center"
        >
            {children}
        </ScrollView>
    )
}