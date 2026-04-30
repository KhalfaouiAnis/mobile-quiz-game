import { ReactNode } from "react";
import { ScrollView } from "react-native";
import { boxShadow } from "@/src/utils/cn";

export default function ViewWrapper({ children }: { children: ReactNode }) {
    return (
        <ScrollView
            className="relative bg-white border border-secondary-500 py-6 px-2 rounded-3xl"
            style={boxShadow(4, 16, 32, 0, "rgba(000 000 000 / 0.70)")}
            contentContainerClassName="items-center"
        >
            {children}
        </ScrollView>
    )
}