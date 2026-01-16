import { authStore } from "@/core/store/auth.store";
import { boxShadow } from "@/core/utils/cn";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface Props {
    cancel: () => void;
}

export default function LogoutModal({ cancel }: Props) {
    const { signOut } = authStore()

    const handleSignout = async () => {
        signOut().then(()=> router.dismissTo("/(auth)"))
    }

    return (
        <View
            className="items-center justify-center p-6 bg-white rounded-3xl"
            style={boxShadow(0, 16, 32, 0, "rgb(000 000 000 / 0.23)").button}
        >
            <Text className="font-cairo text-xl">هل تريد حقا تسجيل الخروج؟</Text>
            <View className="flex-row items-center gap-4 mt-10">
                <Pressable
                    onPress={cancel}
                    style={boxShadow().button}
                    className="bg-white border border-gray-400 rounded-3xl items-center py-4 w-40">
                    <Text className="font-cairo-bold">الغاء</Text>
                </Pressable>
                <Pressable
                    onPress={handleSignout}
                    style={boxShadow().button}
                    className="bg-error  rounded-3xl items-center py-4 w-40">
                    <Text className="font-cairo-bold text-white">خروج</Text>
                </Pressable>
            </View>
        </View>
    )
}