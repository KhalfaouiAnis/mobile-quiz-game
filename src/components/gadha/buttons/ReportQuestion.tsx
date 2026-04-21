import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fontScale, scale, verticalScale } from "@/src/utils/dimensions";
import AppModal from "@/src/components/shared/modal/AppModal";
import { useCallback, useState } from "react";
import ReportingModal from "../../shared/modal/ReportModalContent";

export default function ReportQuestion() {
    const [visible, setVisible] = useState(false);

    const handleClose = useCallback(() => setVisible(false), [])
    const handleOpen = useCallback(() => setVisible(true), [])

    return (
        <>
            <Pressable
                className="flex-row items-center justify-between rounded-[7px] border border-secondary-500 px-1 absolute top-2"
                style={{ backgroundColor: "transparent", width: scale(130), height: verticalScale(40) }}
                onPress={handleOpen}
            >
                <Ionicons name="flag" color="white" size={fontScale(20)} />
                <Text style={{ fontSize: fontScale(14) }} className="text-white font-cairo-bold">بلغ عن السؤال</Text>
            </Pressable>
            <AppModal
                visible={visible}
                onClose={handleClose}
                content={<ReportingModal />}
            />
        </>
    )
}